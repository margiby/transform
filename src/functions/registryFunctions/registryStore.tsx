import type { RegisteredDiagram, DiagramId, DiagramKey } from "@/types";

/**
 * Ein globales Objekt, das alle registrierten Diagramme speichert.
 * Der Schlüssel ist die Diagramm-ID, der Wert ist ein RegisteredDiagram.
 */
export const diagramRegistry: Record<string, RegisteredDiagram> = {};

/**
 * Prüft, ob ein Diagramm bereits registriert ist
 */
export function isDiagramRegistered(diagramId: DiagramId): boolean {
  return diagramRegistry[diagramId] !== undefined;
}

/**
 * Holt ein registriertes Diagramm aus der Registry.
 * @returns Das Diagramm oder undefined, wenn nicht vorhanden
 */
export function getDiagram(diagramId: DiagramId): RegisteredDiagram | undefined {
  return diagramRegistry[diagramId];
}

/**
 * Holt ein registriertes Diagramm mit Tree-Config aus der Registry.
 * Utility-Funktion für häufiges Pattern.
 * @returns Das Diagramm mit treeConfig oder undefined
 */
export function getTreeDiagram(diagramId: DiagramKey): RegisteredDiagram & { treeConfig: NonNullable<RegisteredDiagram["treeConfig"]> } | undefined {
  const entry = diagramRegistry[diagramId];
  
  if (entry?.treeConfig) {
    return entry as RegisteredDiagram & { treeConfig: NonNullable<RegisteredDiagram["treeConfig"]> };
  }
  
  return undefined;
}
