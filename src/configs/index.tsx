/**
 * Zentrale Exports für alle Konfigurationen
 * @module configs
 * @description Dieses Modul bündelt und exportiert alle Konfigurationsdateien der Anwendung, 
 * einschließlich Datenquellen, Diagrammkonfigurationen, ELK-Layout-Optionen, 
 * Node-Dimensionen sowie Main-Diagramm- und Tabellenkonfigurationen.
 * @exports DATA_SOURCES - Datenquellen-Konfigurationen.
 * @exports DIAGRAMS - Diagramm-Konfigurationen.
 * @exports BASE_ELK_OPTIONS, TREE_ELK_OPTIONS - ELK Layout-Optionen.
 * @exports DEFAULT_NODE_WIDTH, DEFAULT_NODE_HEIGHT, nodeDimensionMap - Node-Dimensionen.
 * @exports mainDiagramNodes - Knoten für das Hauptdiagramm.
 * @exports mainDiagramEdges - Kanten für das Hauptdiagramm.
 * @exports tableConfigs - Tabellenkonfigurationen.
 */

// Datenquellen
export { DATA_SOURCES } from "./dataSources";

// Diagramm-Konfigurationen
export { DIAGRAMS } from "./diagramConfigs";

// ELK Layout-Optionen
export { BASE_ELK_OPTIONS, TREE_ELK_OPTIONS } from "./elkLayoutOptions";

// Node-Dimensionen
export { 
  DEFAULT_NODE_WIDTH, 
  DEFAULT_NODE_HEIGHT, 
  nodeDimensionMap 
} from "./nodeDimensions";

// Main Diagram Configuration (Nodes & Edges)
export { mainDiagramNodes } from "./mainDiagram/nodes";
export { mainDiagramEdges } from "./mainDiagram/edges";
