import { ReactElement } from "react";
import { ReactFlowProvider } from "@xyflow/react";
import DiagramOrchestrator from "./DiagramOrchestrator";
import "@xyflow/react/dist/style.css";
import "@/styles/diagram.css";
import "@/styles/subdiagrams.css";

/**
 * Interaktives Diagramm - Haupt-Exportkomponente
 * 
 * Diese Komponente ist der Einstiegspunkt für das gesamte Diagramm-System.
 * 
 * Architektur:
 * - ReactFlowProvider: Stellt Context für alle ReactFlow-Komponenten bereit
 * - DiagramOrchestrator: Orchestriert Loading/Error States und Rendering
 * - DiagramContainer: Rendert das aktive Diagramm mit Controls und Tabelle
 * - DiagramFlow: Rendert das ReactFlow-Diagramm mit Nodes und Edges
 * - TableComponent: Zeigt die Eigenschaften-Tabelle an (lazy loaded)
 */
const InteractiveDiagram = (): ReactElement => {
  return (
    <ReactFlowProvider>
      <DiagramOrchestrator />
    </ReactFlowProvider>
  );
};

export default InteractiveDiagram;