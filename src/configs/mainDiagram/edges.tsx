import type { DiagramEdgeConfig } from "@/types";
import { MarkerType } from "@xyflow/react";

// Definition der Kanten mit angepassten IDs, Farben und Animationen
export const mainDiagramEdges: DiagramEdgeConfig[] = [
  // Verbindungen von "Xducts"
  {
    id: "e1",
    source: "xducts", // Die ID des Quellknotens
    target: "conversion_procedures", // Die ID des Zielknotens
    markerEnd: { type: MarkerType.ArrowClosed, width: 10, height: 10 }, //Pfeilspitze at end
    style: { stroke: "#a3e635", strokeWidth: 3 }, 
  },
  {
    id: "e2",
    source: "xducts",
    target: "process_chains",
    markerEnd: { type: MarkerType.ArrowClosed, width: 10, height: 10 },  
    style: { stroke: "#a5b4fc", strokeWidth: 3 },
  },
  {
    id: "e3",
    source: "xducts",
    target: "mix",
    markerEnd: { type: MarkerType.ArrowClosed, width: 10, height: 10 }, 
    style: { stroke: "#f87171", strokeDasharray: "5 5", strokeWidth: 3 }, // gestrichelte Linie
    // animated: true,
    
  },
  {
    id: "e4",
    source:"xducts",
    target: "supply_concepts",
    markerEnd: { type: MarkerType.ArrowClosed, width: 10, height: 10 },  
    style: { stroke: "#a3e635", strokeWidth: 3 }, 
  },
{
    id: "e5",
    source: "xducts",
    target: "supply_tasks",
    markerEnd: { type: MarkerType.ArrowClosed, width: 10, height: 10 }, 
    style: { stroke: "#f5d109ff", strokeWidth: 3 }, 
  },
  {
    id: "e6",
    source:"process_chains",
    target:"mix",
    markerEnd: { type: MarkerType.ArrowClosed, width: 10, height: 10 }, 
    style: { stroke: "#f87171", strokeDasharray: "5 5", strokeWidth: 3 }, 
    // animated: true,
  },
  // Verbindungen von "Supply Concepts"
  {
    id: "e7",
    source:"supply_concepts",
    target: "conversion_procedures",
    style: { stroke: "#6ee7b7", strokeWidth: 3 },
    markerEnd: { type: MarkerType.ArrowClosed, width: 10, height: 10 }, 
  },
  {
    id: "e8",
    source: "supply_concepts",
    target: "process_chains",
    markerEnd: { type: MarkerType.ArrowClosed, width: 10, height: 10 }, 
    style: { stroke: "#3730a3", strokeWidth: 3 }, 
  },
    {
    id: "e9",
    source: "supply_concepts",
    target: "mix",
    markerEnd: { type: MarkerType.ArrowClosed, width: 10, height: 10 }, 
    style: { stroke: "#f87171", strokeDasharray: "5 5", strokeWidth: 3 }, 
    // animated: true,
  },
  
  {
    id: "e10",
    source: "supply_concepts",
    target: "supply_tasks",
    markerEnd: { type: MarkerType.ArrowClosed, width: 10, height: 10 }, 
    style: { stroke: "#f5d109ff", strokeWidth: 3},
  },
];