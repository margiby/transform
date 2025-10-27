import type { NodeDimensions } from "@/types";
import { DIAGRAMS } from "./diagramConfigs";
import { mainDiagramNodes } from "./mainDiagram/nodes";

/**
 * Node-Dimensionen für Diagramme
 * 
 * Diese Datei enthält alle Knotengrößen, die für das ELK-Layout benötigt werden.
 * Die Dimensionen werden basierend auf den Node-Typen (classNames) aus diagramConfigs.tsx zugeordnet.
 */

// ====================================================================
// Standard-Dimensionen
// ====================================================================

export const DEFAULT_NODE_WIDTH = 300;
export const DEFAULT_NODE_HEIGHT = 60;

// ====================================================================
// Node-Dimensionen nach Diagramm-Typ
// ====================================================================

/**
 * Aliase für bessere Lesbarkeit
 */
const mainNodes = Object.fromEntries(
  mainDiagramNodes.map(node => [node.id, node.className])
) as Record<string, string>;
const processChains = DIAGRAMS.process_chains.config.classNames;
const supplyTasks = DIAGRAMS.supply_tasks.config.classNames;
const supplyConcepts = DIAGRAMS.supply_concepts.config.classNames;
const xducts = DIAGRAMS.xducts.config.classNames;
const conversionProcedures = DIAGRAMS.conversion_procedures.config.classNames;

/**
 * Hauptdiagramm Node-Typen (aus MAIN_DIAGRAM_NODE_CLASSES)
 */
const MAIN_DIAGRAM_NODES: Record<string, NodeDimensions> = {
  [mainNodes.xducts]: { width: 180, height: 60 },
  [mainNodes.conversion_procedures]: { width: 250, height: 60 },
  [mainNodes.mix]: { width: 150, height: 60 },
  [mainNodes.process_chains]: { width: 180, height: 60 },
  [mainNodes.supply_tasks]: { width: 250, height: 60 },
  [mainNodes.supply_concepts]: { width: 250, height: 60 },
};

/**
 * Dimensionen für Subdiagramm-Nodes (dynamisch aus DIAGRAMS config generiert)
 */
const SUBDIAGRAM_DIMENSIONS: Record<string, NodeDimensions> = {
  // Process Chains
  [processChains.root]: { width: 300, height: 80 },
  [processChains.category]: { width: 400, height: 55 },
  [processChains.group]: { width: 260, height: 35 },
  [processChains.leaf]: { width: 630, height: 35 },

  // Supply Concepts
  [supplyConcepts.root]: { width: 350, height: 80 },
  [supplyConcepts.category]: { width: 350, height: 35 },
  [supplyConcepts.group]: { width: 500, height: 35 },

  // Supply Tasks
  [supplyTasks.root]: { width: 330, height: 80 },
  [supplyTasks.category]: { width: 260, height: 55 },
  [supplyTasks.group]: { width: 350, height: 35 },

  // Xducts
  [xducts.root]: { width: 250, height: 80 },
  [xducts.category]: { width: 360, height: 40 },
  [xducts.group]: { width: 350, height: 35 },
  [xducts.leaf]: { width: 450, height: 35 },

  // Conversion Procedures
  [conversionProcedures.root]: { width: 350, height: 80 },
  [conversionProcedures.category]: { width: 350, height: 55 },
  [conversionProcedures.group]: { width: 500, height: 40 },
};

/**
 * Map zur Zuordnung von CSS-Klassen zu festen Knotengrößen.
 * ELK benötigt diese expliziten Abmessungen für das Layout.
 */
export const nodeDimensionMap: Record<string, NodeDimensions> = {
  "default-node": { width: DEFAULT_NODE_WIDTH, height: DEFAULT_NODE_HEIGHT },
  ...MAIN_DIAGRAM_NODES,
  ...SUBDIAGRAM_DIMENSIONS,
};
