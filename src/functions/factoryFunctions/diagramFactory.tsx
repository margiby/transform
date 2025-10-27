import type {
  DiagramNode,
  DiagramEdge,
  TreeFactoryNodeConfig,
  FlexibleDiagramConfig,
  DiagramFactoryOptions,
  DiagramNodeConfig,
  DiagramId,
  DiagramKey,
} from "@/types";
import { diagramRegistry, registerDiagram } from "../registryFunctions";
import { hasProperties } from "../transformFunctions/transformHelpers";

/** 
 * ==== DIAGRAMM-FACTORY FUNKTIONEN ====
 * Diese Funktionen erstellen Diagramme basierend auf verschiedenen Konfigurationen.
 * Sie unterstützen flexible Diagramme mit Mehrfachkanten und Baumdiagramme mit einklappbaren Knoten.
 */

/**
 * HILFSFUNKTION
 * Löst die Factory-Optionen auf und setzt Standardwerte, falls nicht angegeben.
 */
export function resolveFactoryOptions(
  diagramId: DiagramId,
  options: DiagramFactoryOptions = {}
) {
  return {
    defaultClassName: options.defaultClassName ?? "default-node",
    defaultNodeType: options.defaultNodeType ?? "default",
    defaultEdgeType: options.defaultEdgeType ?? "default",
    edgeStyle: options.edgeStyle,
    nodeIdPrefix: options.nodeIdPrefix ?? `${diagramId}-n`,
    elkOptions: options.elkOptions,
    defaultTargetPosition: options.defaultTargetPosition,
    defaultSourcePosition: options.defaultSourcePosition,
  };
}
/**
 * HILFSFUNKTION
 * Erstellt einen DiagramNode aus einer Konfiguration und den aufgelösten Optionen.
 */

function mapNodeConfig(
  nodeConfig: DiagramNodeConfig, // Benötigt eine Konfiguration mit einer ID
  options: ReturnType<typeof resolveFactoryOptions>
): DiagramNode {
  return {
    id: nodeConfig.id,
    data: nodeConfig.data,
    type: nodeConfig.type || options.defaultNodeType,
    className: nodeConfig.className || options.defaultClassName,
    position: { x: 0, y: 0 }, // Position wird später durch das Layout (ELK) gesetzt
    sourcePosition: nodeConfig.sourcePosition || options.defaultSourcePosition,
    targetPosition: nodeConfig.targetPosition || options.defaultTargetPosition,
  };
}
/**
* ==== FLEXIBLES DIAGRAMM ====
* Diese Funktion erstellt ein flexibles Diagramm basierend auf der übergebenen Konfiguration.
* Knoten und Kanten werden direkt aus den Arrays in der Konfiguration erstellt.
* Kanten können mehrere Ziele haben, um Mehrfachverbindungen zu unterstützen.
*
*/
export function createFlexibleDiagram(
  diagramId: DiagramId,
  config: FlexibleDiagramConfig,
  options: DiagramFactoryOptions = {}
): void {
  const resolvedOptions = resolveFactoryOptions(diagramId, options);

  const nodes: DiagramNode[] = config.nodes.map((nodeConfig) =>
    mapNodeConfig(nodeConfig, resolvedOptions)
  );

  const edges: DiagramEdge[] = config.edges.flatMap((edgeConfig, edgeIdx) => {
    const { source, target, id, type, ...rest } = edgeConfig;

    const targets = Array.isArray(target) ? target : [target];

    return targets.map((targetItem, targetIdx) => ({
      id: id || `edge-${source}-${targetItem}-${edgeIdx}-${targetIdx}`,
      source: source,
      target: targetItem,
      type: type || resolvedOptions.defaultEdgeType,
      ...rest,
    }));
  });

  registerDiagram(diagramId, nodes, edges, resolvedOptions.elkOptions);
}

/**
* === TREE-DIAGRAMM ===
* Diese Funktion erstellt ein Baumdiagramm basierend auf der übergebenen Konfiguration.
* Jeder Knoten kann Kinder haben, die rekursiv verarbeitet werden.
* Jeder Knoten erhält eine eindeutige ID, wenn keine angegeben ist.
* Kinderknoten werden nur hinzugefügt, wenn der übergeordnete Knoten nicht eingeklappt ist.
* Die Kanten werden automatisch zwischen Eltern- und Kindknoten erstellt.
*/
export function createTreeDiagram(
  diagramId: DiagramKey,
  rootNodeConfig: TreeFactoryNodeConfig,
  options: DiagramFactoryOptions = {}
): void {
  const nodes: DiagramNode[] = [];
  const edges: DiagramEdge[] = [];
  let nodeIdCounter = 0;

  const resolvedOptions = resolveFactoryOptions(diagramId, options);
  const { nodeIdPrefix } = resolvedOptions;

  function processNodeConfig(
    config: TreeFactoryNodeConfig,
    parentNodeId?: string
  ): string {
    nodeIdCounter++;
    // Stellt sicher, dass jeder Knoten eine eindeutige ID hat
    const nodeId = config.id || `${nodeIdPrefix}-${nodeIdCounter}`;

    // Extrahiere häufig verwendete Werte
    const { data, children, collapsed } = config;
    const { table, showTableIcon } = data;
    
    // Prüfe, ob der Node Kinder hat
    const hasChildren = Array.isArray(children) && children.length > 0;
    
    // Prüfe, ob Tabellendaten mit Properties vorhanden sind
    const hasTableData = Boolean(
      table && 
      table[0]?.data &&
      hasProperties(table[0].data)
    );
    
    const newNode = mapNodeConfig(
      {
        ...config,
        id: nodeId,
        data: {
          ...data,
          // Nur table hinzufügen, wenn tatsächlich Properties vorhanden sind
          ...(hasTableData && { table }),
          // Direkte Eigenschaften für Icon-Steuerung
          hasChildren,
          isExpanded: hasChildren && !collapsed,
          showTableIcon: showTableIcon || hasTableData,
        },
      },
      resolvedOptions
    );
    nodes.push(newNode);

    // Kante zum Elternknoten erstellen
    if (parentNodeId) {
      edges.push({
        id: `edge-${parentNodeId}-${nodeId}`,
        source: parentNodeId,
        target: nodeId,
        style: resolvedOptions.edgeStyle,
      });
    }

    // Rekursiv für alle Kinder ausführen, wenn Knoten nicht eingeklappt ist
    if (!collapsed && children && children.length > 0) {
      children.forEach((childConfig) => {
        processNodeConfig(childConfig, nodeId);
      });
    }
    return nodeId;
  }

  processNodeConfig(rootNodeConfig);
  registerDiagram(diagramId, nodes, edges, resolvedOptions.elkOptions);
  
  const entry = diagramRegistry[diagramId];
  if (entry) {
    entry.treeConfig = rootNodeConfig;
    entry.factoryOptions = resolvedOptions;
  }
}
