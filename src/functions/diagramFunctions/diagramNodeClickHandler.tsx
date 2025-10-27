import { MouseEvent } from "react";
import type { Node } from "@xyflow/react";
import type { DiagramNode, DiagramKey } from "@/types";
import { useDiagramStore } from "@/hooks/diagrammHooks";
import { getDiagram, isDiagramRegistered } from "@/functions/registryFunctions/registryStore";
import { DIAGRAMS } from "@/configs";

/**
 * Handler für Node-Klicks mit Collapse-Support für treeConfig-Diagramme
 * und On-Demand Loading für Subdiagramme.
 */
export default function diagramNodeClickHandler(
  toggleCollapse: (id: string) => void
) {
  return function handleNodeClick(
    event: MouseEvent,
    node: Node<DiagramNode["data"]>
  ): void {
    event.preventDefault();

    // Store nur einmal holen für bessere Performance
    const { diagramId: currentDiagramId, tableData: currentTableData, setTableData } = useDiagramStore.getState();
    const nodeId = node.id;
    const currentDiagram = getDiagram(currentDiagramId);

    //console.log(`[Click] Node clicked: "${nodeId}" in diagram: "${currentDiagramId}"`);

    // Tabellendaten setzen wenn vorhanden - Toggle-Funktionalität
    if (node.data.table) {
      // Toggle: Wenn dieselbe Tabelle bereits geöffnet ist, schließe sie
      if (currentTableData === node.data.table) {
        setTableData(null);
      } else {
        // Sonst öffne die neue Tabelle
        setTableData(node.data.table);
      }
      return;
    }

    // Collapse für treeConfig-Diagramme
    if (currentDiagram?.treeConfig) {
      toggleCollapse(nodeId);
      return;
    }

    // Zu Subdiagramm wechseln - mit On-Demand Loading
    // Prüfe ob node.id ein gültiger DiagramKey ist (nutzt DIAGRAMS Config)
    if (nodeId in DIAGRAMS) {
      handletoSubdiagram(nodeId as DiagramKey);
    }
  };
}

/**
 * Lädt und zeigt ein Subdiagramm an.
 * Wenn das Diagramm noch nicht geladen ist, wird es on-demand geladen.
 * @param diagramId - Die ID des Subdiagramms
 */
async function handletoSubdiagram(diagramId: DiagramKey): Promise<void> {
  const { setDiagramId, setTableData, setIsLoadingSubdiagram } = useDiagramStore.getState();
  
  try {
    // Prüfe ob Diagramm bereits vollständig registriert ist
    if (!isDiagramRegistered(diagramId)) {
      console.log(`[Click Handler] Diagram "${diagramId}" not loaded yet - loading on-demand...`);
      
      // Zeige Loader
      setIsLoadingSubdiagram(true);
      
      // Dynamic Import - loadDiagramOnDemand
      const { loadDiagramOnDemand } = await import("./loadDiagramOnDemand");
      
      // Lade Diagramm on-demand
      await loadDiagramOnDemand(diagramId);
      
      // Verstecke Loader
      setIsLoadingSubdiagram(false);
    }
    
    // Wechsel zum Diagramm (instant wenn bereits geladen)
    setDiagramId(diagramId);
    setTableData(null);
    
  } catch (error) {
    console.error(`Failed to load diagram "${diagramId}":`, error);
    setIsLoadingSubdiagram(false);
    
    // Zeige Fehlermeldung an User (optional)
    alert(`Fehler beim Laden des Diagramms: ${error instanceof Error ? error.message : 'Unbekannter Fehler'}`);
  }
}
