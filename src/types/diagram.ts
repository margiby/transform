/**
 * Typen für Diagramm-Komponenten
 * 
 * Alle Typen für ReactFlow-Diagramme, Nodes, Edges und Layout
 */

import type {
  Node,
  NodeProps,
  Edge,
  Position,
  EdgeMarker,
  OnNodesChange,
  OnEdgesChange,
  NodeMouseHandler,
} from "@xyflow/react";
import type { ReactNode, RefObject, CSSProperties } from "react";
import type { LayoutOptions } from "elkjs/lib/elk-api";
import type { TableDataArray } from "./table";
import type {
  LocalizedName,
  LocalizableEntity,
  LocalizedMessage,
} from "./localization";
import type { DIAGRAMS } from "../configs/diagramConfigs";
import type { DATA_SOURCES } from "../configs/dataSources";

// ====================================================================
// Diagram Configuration
// ====================================================================

/**
 * Typen für verfügbare Diagramm-IDs
 * Basiert auf den Keys der DIAGRAMS Konfiguration
 */
export type DiagramKey = keyof typeof DIAGRAMS;

/**
 * Erweiterte Diagramm-ID inkl. "root" für das Hauptdiagramm
 */
export type DiagramId = DiagramKey | "root";

/**
 * Typen für verfügbare Datenquellen-Keys
 * Basiert auf den Keys der DATA_SOURCES Konfiguration
 */
export type DataSourceKey = keyof typeof DATA_SOURCES;

/**
 * Typ für Datenquellen-Values (Pfade)
 * Basiert auf den Values der DATA_SOURCES Konfiguration
 */
export type DataSourcePath = typeof DATA_SOURCES[DataSourceKey];

// ====================================================================
// ELK Layout Options
// ====================================================================

export type ElkLayoutOptions = LayoutOptions;

// ====================================================================
// Floating UI Return Type
// ====================================================================

/**
 * Floating UI Return Type für useFloating Hook
 * Wird für Tooltip-Komponenten verwendet
 */
export type FloatingUIReturn = ReturnType<typeof import("@floating-ui/react").useFloating>;

// ====================================================================
// Node Dimensions
// ====================================================================

export type NodeDimensions = {
  width: number;
  height: number;
};

// ====================================================================
// Basis-Datentypen für Knoten
// ====================================================================

/**
 * Kern-Daten, die jeder Knoten enthalten kann
 */
export type NodeData = {
  label: string | LocalizedName | LocalizableEntity | LocalizedMessage | ReactNode;
  description?: string | LocalizedMessage;
  icon?: ReactNode;
  table?: TableDataArray;
  hasChildren?: boolean;
  isExpanded?: boolean;
  showTableIcon?: boolean;
  [key: string]: unknown;
};

/**
 * Props für NodeControls Komponente
 */
export type NodeControlsProps = Pick<NodeData, 'hasChildren' | 'isExpanded' | 'showTableIcon'>;

/**
 * Spezifischer Knotentyp für Diagramme
 */
export type DiagramNode = Node<NodeData>;

/**
 * Allgemeiner Datentyp für Kanten
 */
export type DiagramEdge = Edge<Record<string, unknown>>;

/**
 * Node mit flexiblen Handle-Positionen
 */
export type CustomNodeProps = NodeProps<Node<NodeData>> & {
  targetPosition?: Position;
  sourcePosition?: Position;
};

// ====================================================================
// Rückgabetyp für useDiagramLayout Hook
// ====================================================================

export type UseDiagramLayoutReturn = {
  nodes: DiagramNode[];
  edges: DiagramEdge[];
  onNodesChange: OnNodesChange<DiagramNode>;
  onEdgesChange: OnEdgesChange<DiagramEdge>;
  isLoadingLayout: boolean;
  hasLayouted: boolean;
  flowContainerRef: RefObject<HTMLDivElement | null>;
  collapseNode: (nodeId: string) => void;
  handleToggleAll: (collapse: boolean) => void;
};

// ====================================================================
// Gemeinsamer Basistyp für alle Knotenkonfigurationen
// ====================================================================

export type BaseNodeConfig = {
  className?: string;
  type?: string;
  data: NodeData;
};

// ====================================================================
// Konfigurationen für die Diagramm-Factories
// ====================================================================

export type DiagramFactoryOptions = {
  defaultClassName?: string;
  nodeIdPrefix?: string;
  defaultNodeType?: string;
  defaultEdgeType?: string;
  elkOptions?: ElkLayoutOptions;
  defaultTargetPosition?: Position;
  defaultSourcePosition?: Position;
  edgeStyle?: CSSProperties;
};

// ====================================================================
// Spezifische Konfigurationen für `createTreeDiagram`
// ====================================================================

export type TreeFactoryNodeConfig = BaseNodeConfig & {
  id?: string;
  collapsed?: boolean;
  children?: TreeFactoryNodeConfig[];
};

// ====================================================================
// Spezifische Konfigurationen für `createFlexibleDiagram`
// ====================================================================

/**
 * Input-Typ für Main Diagram Node-Konfiguration
 */
export type MainNodeInput = {
  id: DiagramId;
  icon: ReactNode;
};

export type DiagramNodeConfig = BaseNodeConfig & {
  id: string;
  sourcePosition?: Position;
  targetPosition?: Position;
};

/**
 * Konfiguration für eine Kante in einem flexiblen Diagramm
 */
export type DiagramEdgeConfig = {
  source: string;
  target: string | string[];
  id?: string;
  type?: string;
  style?: CSSProperties;
  animated?: boolean;
  markerStart?: EdgeMarker;
  markerEnd?: EdgeMarker;
  [key: string]: unknown;
};

/**
 * Edge-Parameter für Floating Edge
 */
export type EdgeParams = {
  sx: number;
  sy: number;
  tx: number;
  ty: number;
};

/**
 * Die gesamte Konfiguration für ein flexibles Diagramm
 */
export type FlexibleDiagramConfig = {
  nodes: DiagramNodeConfig[];
  edges: DiagramEdgeConfig[];
};

// ====================================================================
// Typen für die Tooltip-Komponente (Floating UI)
// ====================================================================

/**
 * Rückgabetyp für useTooltip Hook (Floating UI pattern)
 * Verwendet native Floating UI Typen für refs, context, middlewareData, placement
 */
export type UseTooltipReturn = {
  isOpen: boolean;
  content: string;
  refs: FloatingUIReturn["refs"];
  floatingStyles: React.CSSProperties;
  context: FloatingUIReturn["context"];
  getReferenceProps: (userProps?: React.HTMLProps<Element>) => Record<string, unknown>;
  getFloatingProps: (userProps?: React.HTMLProps<HTMLElement>) => Record<string, unknown>;
  handleNodeMouseEnter: NodeMouseHandler;
  handleNodeMouseLeave: NodeMouseHandler;
  arrowRef: React.RefObject<SVGSVGElement | null>;
  middlewareData: FloatingUIReturn["middlewareData"];
  placement: FloatingUIReturn["placement"];
  isPositioned: boolean;
};

// ====================================================================
// Typen für den Zustand des Diagramms (Store)
// ====================================================================

export type Store = {
  diagramId: DiagramId;
  setDiagramId: (id: DiagramId) => void;
  tableData: TableDataArray | null;
  setTableData: (data: TableDataArray | null) => void;
  isLoadingSubdiagram: boolean;
  setIsLoadingSubdiagram: (loading: boolean) => void;
};

// ====================================================================
// Typen für Scroll-Utils
// ====================================================================

export type ScrollToOptions = {
  headerOffset?: number;
  behavior?: ScrollBehavior;
  timeout?: number;
};

// ====================================================================
// Typen für Diagramm-Registry
// ====================================================================

/**
 * Typ für ein registriertes Diagramm
 */
export type RegisteredDiagram = {
  nodes: DiagramNode[];
  edges: DiagramEdge[];
  elkOptions?: ElkLayoutOptions;
  treeConfig?: TreeFactoryNodeConfig;
  factoryOptions?: DiagramFactoryOptions;
};

// ====================================================================
// Diagramm-Komponenten Props
// ====================================================================

/**
 * Props für DiagramTitle-Komponente
 */
export type DiagramTitleProps = {
  diagramId: DiagramId;
};

/**
 * Props für DiagramControls-Komponente
 */
export type DiagramControlsProps = {
  isSubdiagram: boolean;
  onExpandAll: () => void;
  onCollapseAll: () => void;
  onBack: () => void;
};

/**
 * Props für DiagramFlow-Komponente
 */
export type DiagramFlowProps = Omit<UseDiagramLayoutReturn, 'collapseNode' | 'handleToggleAll'> & {
  onNodeClick: NodeMouseHandler<DiagramNode>;
  onNodeMouseEnter: NodeMouseHandler<DiagramNode>;
  onNodeMouseLeave: NodeMouseHandler<DiagramNode>;
  tooltip: UseTooltipReturn;
};

/**
 * Props für DiagramTooltip-Komponente
 */
export type DiagramTooltipProps = {
  isOpen: boolean;
  content: string;
  refs: FloatingUIReturn["refs"];
  floatingStyles: React.CSSProperties;
  getFloatingProps: (userProps?: React.HTMLProps<HTMLElement>) => Record<string, unknown>;
  arrowRef: React.RefObject<SVGSVGElement | null>;
  context: FloatingUIReturn["context"];
  isPositioned: boolean;
};
