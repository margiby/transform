import type { DiagramNode, DiagramEdge, ElkLayoutOptions, TreeFactoryNodeConfig, DiagramId, DiagramKey } from "@/types";
import { diagramRegistry, isDiagramRegistered, getTreeDiagram } from "./registryStore";
import { saveExpandState, restoreExpandState, collapseDeep } from "@/functions/factoryFunctions";

/**
 * Die Kernfunktion zum Registrieren eines Diagramms in der Registry.
 * Enthält grundlegende Validierungen.
 * @param id Die ID des Diagramms.
 * @param nodes Die Knoten des Diagramms.
 * @param edges Die Kanten des Diagramms.
 * @param elkOptions Optionale ELK-Layout-Optionen.
 */
export function registerDiagram(
  id: DiagramId,
  nodes: DiagramNode[],
  edges: DiagramEdge[],
  elkOptions?: ElkLayoutOptions
): void {
  if (!id || typeof id !== "string") {
    console.error("[registerDiagram]: Ungültige Diagramm-ID:", id);
    return;
  }

  if (!Array.isArray(nodes) || !Array.isArray(edges)) {
    console.error(
      "[registerDiagram]: Ungültige Knoten- oder Kantendaten für:",
      id
    );
    return;
  }

  // Diese Prüfung ist letzte Sicherheitsinstanz, falls tryRegisterDiagram umgangen wird.
  if (diagramRegistry[id]) {
    console.warn(
      `[registerDiagram]: Interner Aufruf zum Überschreiben von "${id}" abgefangen.`
    );
    return;
  }

  diagramRegistry[id] = { nodes, edges, elkOptions };
}

/**
 * Wrapper-Funktion, um ein Diagramm nur zu registrieren, wenn es noch nicht existiert.
 * @param diagramId Die ID des zu registrierenden Diagramms.
 * @param registrationFunction Eine Funktion, die die eigentliche Registrierungslogik ausführt.
 */
export function tryRegisterDiagram(
  diagramId: DiagramId,
  registrationFunction: () => void
): void {
  // Prüfe ob bereits ein FERTIGES Diagramm existiert (keine Factory)
  if (!isDiagramRegistered(diagramId)) {
    registrationFunction();
  } else {
    console.log(`SKIPPED: Diagramm "${diagramId}" ist bereits registriert.`);
  }
}

/**
 * Bereitet eine Tree-Config für eine Neu-Registrierung vor.
 * Speichert den aktuellen Expand-Zustand, falls das Diagramm bereits existiert,
 * und löscht das alte Diagramm aus der Registry.
 * 
 * @param diagramId Die ID des Diagramms
 * @param treeConfig Die neue Tree-Konfiguration (wird modifiziert mit dem gespeicherten Zustand)
 * @returns true wenn ein Diagramm existierte und gelöscht wurde, sonst false
 */
export function prepareTreeConfig(
  diagramId: DiagramKey,
  treeConfig: TreeFactoryNodeConfig
): boolean {
  // Nutze gemeinsame Utility-Funktion
  const previousDiagram = getTreeDiagram(diagramId);
  
  if (previousDiagram) {
    // Speichere den aktuellen Zustand BEVOR löschen
    const savedState = saveExpandState(previousDiagram.treeConfig);
    
    // Lösche das alte Diagramm
    delete diagramRegistry[diagramId];
    
    // Kollabiere die neue Config initial
    collapseDeep(treeConfig);
    
    // Stelle den gespeicherten Zustand in der neuen Config wieder her
    restoreExpandState(treeConfig, savedState);
    
    return true; 
  }
  
  return false;
}

/**
 * Hilfsfunktion für Subdiagramm-Registrierung mit Tree Config.
 * 
 * Verhalten:
 * - Wenn Diagramm existiert: Restore expand state
 * - Wenn Diagramm NEU ist: Collapse initial
 * 
 * @param diagramId - Die ID des Diagramms
 * @param treeConfig - Die Tree-Konfiguration
 */
export function initTreeConfig(
  diagramId: DiagramKey,
  treeConfig: TreeFactoryNodeConfig
): void {
  const diagramExists = prepareTreeConfig(diagramId, treeConfig);
  if (!diagramExists) {
    // Erstes Laden -> initial kollabieren
    collapseDeep(treeConfig);
  }
}
