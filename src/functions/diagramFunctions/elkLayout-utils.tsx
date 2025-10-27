import ELK, { ElkNode, ElkExtendedEdge } from "elkjs/lib/elk-api";
import {
  DiagramNode,
  DiagramEdge,
  NodeDimensions,
  ElkLayoutOptions,
} from "@/types";
import {
  DEFAULT_NODE_WIDTH as width,
  DEFAULT_NODE_HEIGHT as height,
  nodeDimensionMap,
} from "@/configs";

// Import ELK worker URL 
import elkWorkerUrl from 'elkjs/lib/elk-worker.min.js?url';

/** Die Kernlogik für die Layout-Berechnung mit elkjs.
 * https://eclipse.dev/elk/reference.html
 * Readme: https://github.com/kieler/elkjs#readme
 */

// Initialisiere ELK-Layoutengine mit separatem WebWorker (besser für UI-Performance)
const elk = new ELK({ workerUrl: elkWorkerUrl });

// Cache für Node-Dimensionen (Memoization für Performance)
const dimensionsCache = new Map<string, NodeDimensions>();

/**
 * Ermittelt die Größe eines Knotens basierend auf seiner CSS-Klasse.
 * Nutzt Memoization für bessere Performance bei wiederholten Aufrufen.
 */
const getNodeDimensions = (className?: string): NodeDimensions => {
  if (!className) return { width, height };

  // Prüfe Cache zuerst
  if (dimensionsCache.has(className)) {
    return dimensionsCache.get(className)!;
  }

  // Findet den ersten Eintrag in nodeDimensionMap, dessen Schlüssel im className-String enthalten ist.
  const matchedEntry = Object.entries(nodeDimensionMap).find(([key]) =>
    className.includes(key)
  );

  // Wenn ein passender Eintrag gefunden wurde, gib dessen Dimensionen zurück, ansonsten die Standarddimensionen.
  const dimensions = matchedEntry?.[1] ?? { width, height };

  // Speichere im Cache
  dimensionsCache.set(className, dimensions);

  return dimensions;
};

/**
 * Extrahiert Label-Text für ELK Layout-Berechnung.
 * Unterstützt String, LocalizedName und andere Typen.
 */
const extractLabelText = (label: unknown): string => {
  if (typeof label === "string") {
    return label;
  }

  if (label && typeof label === "object" && "name_english" in label) {
    // LocalizedName: Fallback auf English für Layout-Berechnung
    return (label as { name_english: string }).name_english;
  }

  return "";
};

// Berechnet das Layout für gegebene Knoten und Kanten unter Verwendung der ELKjs-Bibliothek.
export const getLayoutedElements = async (
  nodesToLayout: DiagramNode[],
  edgesToLayout: DiagramEdge[],
  options: ElkLayoutOptions // Zusätzliche ELK-Layoutoptionen
): Promise<{ nodes: DiagramNode[]; edges: DiagramEdge[] }> => {
  // Performance-Check: Leere Diagramme sofort zurückgeben
  if (nodesToLayout.length === 0) {
    return { nodes: [], edges: [] };
  }

  // 1. Erstellt eine Map für die Dimensionen, um wiederholte Berechnungen zu vermeiden.
  const nodeDimensionsCache = new Map<string, NodeDimensions>(
    nodesToLayout.map((n) => [n.id, getNodeDimensions(n.className)])
  );

  // 2. Konvertiert React-Flow-Knoten in ELK-Knotenformat mit Dimensionen
  const elkNodes: ElkNode[] = nodesToLayout.map((flowNode) => {
    const dims = nodeDimensionsCache.get(flowNode.id)!;
    const labelText = extractLabelText(flowNode.data.label);

    return {
      id: flowNode.id,
      width: dims.width,
      height: dims.height,
      labels: [{ text: labelText }],
    };
  });

  // 3. Konvertiert React-Flow-Kanten in ELK-Kantenformat
  const elkEdges: ElkExtendedEdge[] = edgesToLayout.map((flowEdge) => ({
    id: flowEdge.id,
    sources: [flowEdge.source],
    targets: [flowEdge.target],
  }));

  // 4. Erstellt den Graphen, der an ELKjs übergeben wird.
  //    Dieser Graph enthält die konvertierten Knoten, Kanten und die Layout-Optionen.
  const graphToLayout: ElkNode = {
    id: "root", // ELK-interner Container (nicht die Diagramm-ID)
    layoutOptions: options,
    children: elkNodes,
    edges: elkEdges,
  };

  //=== Try-Catch-Block für asynchrone Layout-Berechnung ===
  try {
    // Führt die Layout-Berechnung mit ELKjs asynchron durch.
    const layoutedGraph = await elk.layout(graphToLayout);

    //Transformiert die von ELK berechneten Positionen und Größen zurück auf die React Flow Knoten.
    const layoutedNodeMap = new Map(
      layoutedGraph.children?.map((n) => [n.id, n]) ?? []
    );

    // Batch-Update: Alle Nodes in einem Durchgang transformieren
    const newNodes = nodesToLayout.map((flowNode) => {
      const elkNode = layoutedNodeMap.get(flowNode.id);
      const dims = nodeDimensionsCache.get(flowNode.id)!;

      // Optimierung: Spread nur wenn nötig
      const hasPosition = elkNode?.x !== undefined && elkNode?.y !== undefined;
      const position = hasPosition
        ? { x: elkNode.x!, y: elkNode.y! }
        : { x: 0, y: 0 };

      return {
        ...flowNode, // Behalte alle ursprünglichen Eigenschaften des React Flow Knotens
        position,
        // Aktualisiert die Knotengröße mit den von ELK berechneten Werten
        // Dies stellt sicher, dass React Flow die Knoten mit den von ELK bestimmten Größen rendert.
        style: {
          ...(flowNode.style || {}), // Behalte existierende Styles bei
          width: elkNode?.width ?? dims.width,
          height: elkNode?.height ?? dims.height,
        },
      };
    });
    // Die Kanten bleiben strukturell unverändert,
    // ihre Darstellung passt sich den neuen Knotenpositionen an.
    return { nodes: newNodes, edges: edgesToLayout };
  } catch (e) {
    console.error("ELK Layout Error:", e);

    // Im Fehlerfall: Originalknoten mit initial berechneten Dimensionen zurückgeben
    const fallbackNodes = nodesToLayout.map((node) => {
      const dims = nodeDimensionsCache.get(node.id)!;
      return {
        ...node,
        style: {
          ...(node.style || {}),
          width: dims.width,
          height: dims.height,
        },
      };
    });

    return { nodes: fallbackNodes, edges: edgesToLayout };
  }
};
