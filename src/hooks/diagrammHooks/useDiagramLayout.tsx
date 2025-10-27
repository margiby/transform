import { useEffect, useRef, useState, useCallback } from "react";
import { useNodesState, useEdgesState, useReactFlow } from "@xyflow/react";
import type {
  DiagramNode,
  DiagramEdge,
  UseDiagramLayoutReturn,
  ElkLayoutOptions,
} from "@/types";
import { getLayoutedElements } from "@/functions/diagramFunctions";
import { BASE_ELK_OPTIONS } from "@/configs/elkLayoutOptions";
import { getDiagram } from "@/functions/registryFunctions/registryStore";
import useDiagramStore from "./useDiagramStore";
import {
  toggleNodeCollapse,
  toggleAllNodes,
} from "../../functions/factoryFunctions";

/**
 * Custom Hook für die Verwaltung des Diagramm-Layouts
 * - Berechnet Positionen der Knoten und Kanten via ELK
 * - Reagiert auf Größenänderungen des Diagramm-Containers
 * - Stellt Zustand für React Flow bereit
 */

 export const useDiagramLayout = (): UseDiagramLayoutReturn => {
  // React Flow node/edge state
  const [nodes, setNodes, onNodesChange] = useNodesState<DiagramNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<DiagramEdge>([]);

  // Status für Ladeanzeige und Layout-Fortschritt
  const [isLoadingLayout, setIsLoadingLayout] = useState<boolean>(true);
  const [hasLayouted, setHasLayouted] = useState<boolean>(false);

  // Referenz auf den Diagramm-Container im DOM
  const flowContainerRef = useRef<HTMLDivElement | null>(null);
  const layoutTimeout = useRef<number | null>(null);
  
  // Throttle für Collapse/Expand Operationen
  const collapseThrottleRef = useRef<number | null>(null);
  
  // Cache für bereits gelayoutete Diagramme (pro diagramId)
  const layoutCacheRef = useRef<Record<string, { nodes: DiagramNode[]; edges: DiagramEdge[] }>>({});

  const { fitView } = useReactFlow(); // Ansicht automatisch anpassen
  const { diagramId } = useDiagramStore(); // Aktuell ausgewähltes Diagramm

  /**
   * Hauptfunktion: Callback für Layout-Berechnung
   * Diese Funktion wird aufgerufen, wenn das Diagramm-Layout neu berechnet werden muss.
   */
  const layoutElements = useCallback(
    async (containerWidth?: number, forceLayout: boolean = false) => {
      // Prüfe ob Layout bereits cached ist 
      if (!forceLayout && layoutCacheRef.current[diagramId]) {
        const cached = layoutCacheRef.current[diagramId];
        setNodes(cached.nodes);
        setEdges(cached.edges);
        setIsLoadingLayout(false);
        setHasLayouted(true);
        
        // fitView beim ersten Laden des Diagramms
        requestAnimationFrame(() => {
          fitView({ padding: 0.05, duration: 600 });
        });
        return;
      }

      setIsLoadingLayout(true);

      const currentDiagramData = getDiagram(diagramId);

      // Validierung: Diagramm muss gültige Knoten und Kanten enthalten
      if (
        !currentDiagramData ||
        !Array.isArray(currentDiagramData.nodes) ||
        !Array.isArray(currentDiagramData.edges)
      ) {
        console.error(
          `[useDiagramLayout] Ungültige Diagrammdaten für ID "${diagramId}"`
        );
        setNodes([]);
        setEdges([]);
        setHasLayouted(true);
        setIsLoadingLayout(false);
        return;
      }

      // ELK-Layout-Optionen bestimmen (Diagramm-spezifisch oder global)
      const resolvedElkOptions: ElkLayoutOptions = {
        ...(currentDiagramData.elkOptions ?? BASE_ELK_OPTIONS),
      };

      // Auf kleineren Screens: engere Abstände
      if (containerWidth && containerWidth < 768) {
        resolvedElkOptions["elk.spacing.nodeNode"] = "5";
        resolvedElkOptions["elk.spacing.edgeNode"] = "5";
      }

      try {
        // Layout berechnen (nodes/edges werden intern kopiert)
        const { nodes: layoutedNodes, edges: layoutedEdges } =
          await getLayoutedElements(
            currentDiagramData.nodes,
            currentDiagramData.edges,
            resolvedElkOptions
          );

        // Aktualisiere Zustand mit berechneten Positionen
        setNodes(layoutedNodes);
        setEdges(layoutedEdges);
        
        // Layout im Cache speichern
        layoutCacheRef.current[diagramId] = {
          nodes: layoutedNodes,
          edges: layoutedEdges,
        };

        // Batch fitView mit requestAnimationFrame (verhindert Layout Thrashing)
        requestAnimationFrame(() => {
          // Weitere Verzögerung für glatteres Rendering
          requestAnimationFrame(() => {
            fitView({ padding: 0.05, duration: 600 });
            setHasLayouted(true);
          });
        });
      } catch (err) {
        console.error("Fehler bei ELK Layout:", err);
        // Fallback: Ursprüngliche Nodes verwenden
        setNodes(currentDiagramData.nodes);
        setEdges(currentDiagramData.edges);
        setHasLayouted(true);
      } finally {
        setIsLoadingLayout(false);
      }
    },
    [diagramId, setNodes, setEdges, fitView]
  );

  /**
   * Hilfsfunktion: Entprellt Layout-Neuberechnung bei Größenänderung
   */
  const debounceLayout = (width: number) => {
    if (layoutTimeout.current) clearTimeout(layoutTimeout.current);
    layoutTimeout.current = window.setTimeout(() => {
      layoutElements(width);
    }, 600);
  };

  /**
   * Hilfsfunktion: Knoten einklappen/ausklappen
   * Throttled um zu viele schnelle Operationen zu verhindern
   */
  const collapseNode = useCallback(
    (nodeId: string) => {
      // Throttle: Verhindere mehrfache schnelle Aufrufe
      if (collapseThrottleRef.current) {
        return; // Ignoriere während laufender Operation
      }

      collapseThrottleRef.current = window.setTimeout(() => {
        collapseThrottleRef.current = null;
      }, 300); // 300ms Throttle-Zeit

      // Type Guard: collapse nur in Tree-Diagrammen (nicht in "root")
      if (diagramId !== "root") {
        toggleNodeCollapse(diagramId, nodeId);
        // Cache invalidieren da Tree-Struktur sich ändert
        delete layoutCacheRef.current[diagramId];
        
        // Layout-Neuberechnung mit kleiner Verzögerung für bessere UX
        requestAnimationFrame(() => {
          layoutElements(flowContainerRef.current?.clientWidth, true);
        });
      }
    },
    [diagramId, layoutElements]
  );

  const handleToggleAll = useCallback(
    (collapse: boolean) => {
      // Throttle: Verhindere mehrfache schnelle Aufrufe
      if (collapseThrottleRef.current) {
        return;
      }

      collapseThrottleRef.current = window.setTimeout(() => {
        collapseThrottleRef.current = null;
      }, 300);

      // Type Guard: toggleAll nur in Tree-Diagrammen (nicht in "root")
      if (diagramId !== "root") {
        toggleAllNodes(diagramId, collapse);
        // Cache invalidieren da Tree-Struktur sich ändert
        delete layoutCacheRef.current[diagramId];
        
        // Layout-Neuberechnung mit Verzögerung
        requestAnimationFrame(() => {
          layoutElements(flowContainerRef.current?.clientWidth, true);
        });
      }
    },
    [diagramId, layoutElements]
  );

  /**
   * useEffect:
   * - Initiale Layout-Berechnung
   * - Setup für ResizeObserver → bei Container-Resize neues Layout
   */
  useEffect(() => {
    const container = flowContainerRef.current;
    if (!container) {
      console.warn(
        "[useDiagramLayout] ContainerRef fehlt → kein ResizeObserver"
      );
      return;
    }

    // Batch DOM read mit requestAnimationFrame (verhindert Forced Reflow)
    requestAnimationFrame(() => {
      const width = container.clientWidth;
      layoutElements(width);
    });

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        // ResizeObserver liefert width direkt (kein Forced Reflow)
        debounceLayout(entry.contentRect.width);
      }
    });

    observer.observe(container);

    return () => {
      observer.disconnect();
      if (layoutTimeout.current) clearTimeout(layoutTimeout.current);
      if (collapseThrottleRef.current) clearTimeout(collapseThrottleRef.current);
    };
  }, [diagramId]);

  // Exporte für das Diagramm-UI
  return {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    isLoadingLayout,
    hasLayouted,
    flowContainerRef,
    collapseNode,
    handleToggleAll,
  };
}

 