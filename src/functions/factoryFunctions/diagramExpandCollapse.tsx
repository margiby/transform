import { createTreeDiagram } from "./diagramFactory";
import { diagramRegistry, getTreeDiagram } from "../registryFunctions/registryStore";
import type { TreeFactoryNodeConfig, DiagramKey } from "@/types";

/**
 * Funktionen zum Ein- und Ausklappen von Knoten in Baumdiagrammen.
 * Diese Funktionen ermöglichen das Umschalten des 'collapsed'-Status einzelner Knoten,
 * das Speichern und Wiederherstellen des Zustands sowie das kollabieren bis zu einer bestimmten Tiefe.
 */

/**
 * Sucht einen Knoten in der Hierarchie und toggelt dessen 'collapsed'-Status.
 * @param node - Der aktuelle Knoten
 * @param nodeId - Die ID des zu toggelnden Knotens
 * @returns true, wenn der Knoten gefunden und getoggelt wurde
 */
function toggleFlag(node: TreeFactoryNodeConfig, nodeId: string): boolean {
  if (node.id === nodeId) {
    node.collapsed = !node.collapsed;
    return true;
  }
  if (node.children) {
    for (const child of node.children) {
      if (toggleFlag(child, nodeId)) {
        return true;
      }
    }
  }
  return false;
}

/**
 * Aktualisiert die Hierarchie im Registry-Eintrag und erstellt das Diagramm neu.
 * @param diagramId - Die ID des Diagramms
 * @param nodeId - Die ID des zu toggelnden Knotens 
 */
export function toggleNodeCollapse(diagramId: DiagramKey, nodeId: string): void {
  const entry = getTreeDiagram(diagramId);
  if (!entry) return;

  const found = toggleFlag(entry.treeConfig, nodeId);
  if (!found) return;

  // Diagramm neu erzeugen
  delete diagramRegistry[diagramId];
  createTreeDiagram(
    diagramId,
    entry.treeConfig,
    entry.factoryOptions || { elkOptions: entry.elkOptions }
  );
}

/**
 * Speichert den aktuellen collapsed-Zustand aller Nodes in einer Map
 * @returns Eine Map: Schlüssel = node.id, Wert = true (kollabiert) oder false (expandiert)
 */
export function saveExpandState(node: TreeFactoryNodeConfig): Record<string, boolean> {
  const stateMap: Record<string, boolean> = {};
  
  // Hilfsfunktion: Geht durch den ganzen Baum (von oben nach unten)
  // und merkt sich für jeden Knoten, ob er zugeklappt oder aufgeklappt ist
  function traverse(node: TreeFactoryNodeConfig): void {
    if (node.id) {
      // Speichere: Ist dieser Knoten kollabiert?
      stateMap[node.id] = node.collapsed || false;
    }
    if (node.children) {
      // Gehe zu allen Kind-Knoten und mache das Gleiche
      node.children.forEach(child => traverse(child));
    }
  }
  traverse(node);
  return stateMap;
}

/**
 * Stellt den collapsed-Zustand aus einer gespeicherten Map wieder her
 * Verwendet nach Sprachwechsel, damit die Nodes im gleichen Zustand bleiben.
 * @param node - Der aktuelle Knoten
 * @param stateMap - Die gespeicherte Map mit collapse-Zuständen
 */
export function restoreExpandState(node: TreeFactoryNodeConfig, stateMap: Record<string, boolean>): void {
  // Hilfsfunktion: Geht durch den ganzen Baum
  // und setzt für jeden Knoten den gespeicherten Zustand zurück
  function traverse(node: TreeFactoryNodeConfig): void {
    if (node.id && node.id in stateMap) {
      // Setze: Soll dieser Knoten kollabiert sein?
      node.collapsed = stateMap[node.id];
    }
    if (node.children) {
      node.children.forEach(child => traverse(child));
    }
  }
  
  traverse(node); 
}

/**
 * Setzt rekursiv das 'collapsed'-Flag ab einer bestimmten Tiefe.
 * @param node - Der aktuelle Knoten
 * @param depth - Die aktuelle Tiefe im Baum
 */
export function collapseDeep(node: TreeFactoryNodeConfig, depth = 0): void {
  if (depth >= 1) {
    node.collapsed = true;
  }
  node.children?.forEach((child) => collapseDeep(child, depth + 1));
}

/**
 * Kollabiert initial, aber behält gespeicherten Zustand bei, falls vorhanden
 * @param node - Der aktuelle Knoten
 * @param preserveState - Ob der gespeicherte Zustand wiederhergestellt werden soll
 * @param diagramId - Die ID des Diagramms (für das Laden des gespeicherten Zustands)
 */
export function collapseDeepWithState(node: TreeFactoryNodeConfig, preserveState = false, diagramId?: DiagramKey): void {
  if (preserveState && diagramId) {
    // Versuche den aktuellen Zustand aus der Registry zu laden
    const entry = getTreeDiagram(diagramId);
    if (entry) {
      const savedState = saveExpandState(entry.treeConfig);
      collapseDeep(node, 0); // Initial kollabieren
      restoreExpandState(node, savedState); // Dann gespeicherten Zustand wiederherstellen
      return;
    }
  }
  
  // Fallback: Normal kollabieren
  collapseDeep(node, 0);
}

/**
 * Klappt alle Knoten im Baum ein.
 */
function setCollapseState(
  node: TreeFactoryNodeConfig,
  collapsed: boolean
): void {
  node.collapsed = collapsed;
  if (node.children) {
    for (const child of node.children) {
      setCollapseState(child, collapsed);
    }
  }
}

/**
 * Klappt alle Knoten ein (bis 1 Ebene) oder aus und generiert das Diagramm neu.
 */
export function toggleAllNodes(diagramId: DiagramKey, collapse: boolean): void {
  const entry = getTreeDiagram(diagramId);
  if (!entry) return;

  if (collapse) {
    // nur bis Ebene 1 zu kollabieren
    collapseDeep(entry.treeConfig, 0);
  } else {
    // Für das Aufklappen verwenden die bestehende setCollapseState Funktion
    setCollapseState(entry.treeConfig, false);
  }

  // Diagramm neu erzeugen
  delete diagramRegistry[diagramId];
  createTreeDiagram(
    diagramId,
    entry.treeConfig,
    entry.factoryOptions || { elkOptions: entry.elkOptions }
  );
}
