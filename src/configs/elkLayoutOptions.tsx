import type { ElkLayoutOptions } from "@/types";

/**
 * ELK Layout-Optionen für Diagramme
 * 
 * Diese Datei enthält alle Layout-Konfigurationen für den ELK-Algorithmus.
 */

/**
 * Basiskonfiguration für den ELK-Layout-Algorithmus.
 * Diese Optionen definieren das grundlegende Aussehen und die Anordnung des Hauptdiagramms.
 */
export const BASE_ELK_OPTIONS: ElkLayoutOptions = {
  "elk.algorithm": "force",
  "elk.spacing.nodeNode": "100",
  "elk.force.model": "EADES",
  "elk.force.iterations": "15",
  "elk.interactive": "true",
  "elk.randomSeed": "66666665",
};

/**
 * ELK-Layout-Optionen für Baumstrukturen (Subdiagramme).
 * Verwendet den Layered-Algorithmus für hierarchische Anordnung.
 */
export const TREE_ELK_OPTIONS: ElkLayoutOptions = {
  "elk.algorithm": "org.eclipse.elk.layered",
  "elk.direction": "RIGHT",
  "org.eclipse.elk.layered.spacing.nodeNodeBetweenLayers": "50",
  "org.eclipse.elk.spacing.nodeNode": "10",
  "org.eclipse.elk.layered.spacing.edgeNodeBetweenLayers": "50",
  "org.eclipse.elk.layered.spacing.edgeEdgeBetweenLayers": "10",
  "elk.layered.considerModelOrder.strategy": "NODES_AND_EDGES",
  "elk.layered.cycleBreaking.strategy": "DEPTH_FIRST",
  "elk.layered.nodePlacement.strategy": "NETWORK_SIMPLEX",
  "elk.layered.crossingMinimization.strategy": "LAYER_SWEEP",
};
