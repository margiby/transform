import type { DiagramNodeConfig, MainNodeInput } from "@/types";
import {
  Atom,
  FlaskConical,
  Shuffle,
  Network,
  ListTodo,
  Lightbulb,
} from "lucide-react";

/**
 * Hauptdiagramm Node-Klassennamen
 */
const MAIN_DIAGRAM_NODE_CLASSES = {
  xducts: "xducts-node",
  conversion_procedures: "conversionProcedures-node",
  mix: "mix-node",
  process_chains: "processChains-node",
  supply_tasks: "supplyTasks-node",
  supply_concepts: "supplyConcepts-node",
} as const;

type MainDiagramNodeId = keyof typeof MAIN_DIAGRAM_NODE_CLASSES;

/**
 * Basis-Konfiguration für Main Diagram Nodes (nur ID + Icon)
 */
const NODE_CONFIGS: Array<Omit<MainNodeInput, 'id'> & { id: MainDiagramNodeId }> = [
  { id: "xducts", icon: <Atom size={24} /> },
  { id: "conversion_procedures", icon: <FlaskConical size={24} /> },
  { id: "mix", icon: <Shuffle size={24} /> },
  { id: "process_chains", icon: <Network size={24} /> },
  { id: "supply_tasks", icon: <ListTodo size={24} /> },
  { id: "supply_concepts", icon: <Lightbulb size={24} /> },
];

/**
 * Main Diagram Nodes mit automatisch generierten Labels und Descriptions
 * Generiert messageIds im Format: `{id}_label` und `{id}_description`
 */
export const mainDiagramNodes: DiagramNodeConfig[] = NODE_CONFIGS.map(({ id, icon }) => ({
  id,
  data: {
    icon,
    label: {
      messageId: `${id}_label` as const,
    },
    description: {
      messageId: `${id}_description` as const,
    },
  },
  className: MAIN_DIAGRAM_NODE_CLASSES[id],
}));