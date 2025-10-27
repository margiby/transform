import { DATA_SOURCES as DATA_SRC } from "./dataSources";
import { TREE_ELK_OPTIONS } from "./elkLayoutOptions";
import { addIdsToConfigs } from "../functions/utilityFunctions/configHelpers";
import { Position } from "@xyflow/react";
import type { DataSourcePath, DiagramConfigBase, DiagramFactoryOptions } from "@/types";

/**
 * Zentrale Diagramm-Konfiguration
 * 
 * Kombiniert Datenquellen und Diagramm-Konfigurationen an einem Ort.
 * Jedes Diagramm hat:
 * - dataSource: Pfad zur JSON-Datei (importiert aus dataSources.tsx)
 * - config: Display-Konfiguration (CSS-Klassen, ID-Präfixe)
 * - id: wird automatisch aus dem Key generiert (lowercase)
 * - factoryOptions: Optionen für die Diagramm-Factory
 */

const DIAGRAMS_BASE = {
  process_chains: {
    dataSource: DATA_SRC.PROCESS_CHAINS,
    config: {
      classNames: {
        root: "processChains-root",
        category: "processChains-cat",
        group: "processChains-group",
        leaf: "processChains-leaf",
      },
      idPrefixes: {
        leaf: "chain",
      },
    },
    factoryOptions: {
      elkOptions: TREE_ELK_OPTIONS,
      defaultTargetPosition: Position.Left,
      defaultSourcePosition: Position.Right,
      defaultNodeType: "custom",
      edgeStyle: { stroke: "#9394db", strokeWidth: 2 },
    },
  },
  supply_tasks: {
    dataSource: DATA_SRC.SUPPLY_TASKS,
    config: {
      classNames: {
        root: "supplyTasks-root",
        category: "supplyTasks-cat",
        group: "supplyTasks-group",
      },
      idPrefixes: {
        group: "task", 
      },
    },
    factoryOptions: {
      elkOptions: TREE_ELK_OPTIONS,
      defaultTargetPosition: Position.Left,
      defaultSourcePosition: Position.Right,
      defaultNodeType: "custom",
      edgeStyle: { stroke: "#fcd34d", strokeWidth: 2 },
    },
  },
  supply_concepts: {
    dataSource: DATA_SRC.SUPPLY_CONCEPTS,
    config: {
      classNames: {
        root: "supplyConcepts-root",
        category: "supplyConcepts-cat",
        group: "supplyConcepts-group",
      },
      idPrefixes: {
        group: "concept",
      },
    },
    factoryOptions: {
      elkOptions: TREE_ELK_OPTIONS,
      defaultTargetPosition: Position.Left,
      defaultSourcePosition: Position.Right,
      defaultNodeType: "custom",
      edgeStyle: { stroke: "#6ee7b7", strokeWidth: 2 },
    },
  },
  xducts: {
    dataSource: DATA_SRC.XDUCTS,
    config: {
      classNames: {
        root: "xducts-root",
        category: "xducts-cat",
        group: "xducts-group",
        leaf: "xducts-leaf",
      },
      idPrefixes: {
        leaf: "xduct",
      },
    },
    factoryOptions: {
      elkOptions: TREE_ELK_OPTIONS,
      defaultTargetPosition: Position.Left,
      defaultSourcePosition: Position.Right,
      defaultNodeType: "custom",
      edgeStyle: { stroke: "#a3e635", strokeWidth: 2 },
    },
  },
  conversion_procedures: {
    dataSource: DATA_SRC.CONVERSION_PROCEDURES,
    config: {
      classNames: {
        root: "conversionProcedures-root",
        category: "conversionProcedures-cat",
        group: "conversionProcedures-group",
      },
      idPrefixes: {
        group: "procedure",
      },
    },
    factoryOptions: {
      elkOptions: TREE_ELK_OPTIONS,
      defaultTargetPosition: Position.Left,
      defaultSourcePosition: Position.Right,
      defaultNodeType: "custom",
      edgeStyle: { stroke: "#7dd3fc", strokeWidth: 2 },
    },
  },
} as const satisfies Record<string, {
  dataSource: DataSourcePath;
  config: DiagramConfigBase;
  factoryOptions: DiagramFactoryOptions;
}>;

/**
 * Endgültige DIAGRAMS Konfiguration mit generierten IDs
 * Nutzt addIdsToConfigs Helper aus utilityFunctions
 */
export const DIAGRAMS = addIdsToConfigs(DIAGRAMS_BASE);
