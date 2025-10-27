/**
 * Zentrale Type Exports
 */

// ====================================================================
// Lokalisierungs-Typen
// ====================================================================

export type {
  LocalizedName,
  LocalizableEntity,
  LocalizedMessage,
} from "./localization";

export {
  isLocalizedName,
  isLocalizableEntity,
  isLocalizedMessage,
} from "./localization";

// ====================================================================
// Transform-Typen
// ====================================================================

export type {
  TreeTransformConfig,
  // Diagram Config
  DiagramClassNames,
  DiagramIdPrefixes,
  DiagramConfigBase,
  DiagramConfig,
  // Diagram Data Mapping
  DiagramDataMap,
  // ProcessChains
  ProcessChainsLeaf,
  ProcessChainsGroup,
  ProcessChainsCategory,
  // ConversionProcedures 
  ConversionProceduresGroup,
  ConversionProceduresCategory,
  // SupplyTasks
  SupplyTasksGroup,
  SupplyTasksCategory,
  // SupplyConcepts
  SupplyConceptsGroup,
  SupplyConceptsCategory,
  // Xducts
  XductsLeaf,
  XductsGroup,
  XductsCategory,
} from "./transform";

// ====================================================================
// Tabellen-Typen
// ====================================================================

export type {
  TableData,
  TableDataArray,
  TableComponentProps,
  TableHeaderProps,
  TableWrapperProps,
  TableExportProps,
  // Property-Typen
  PropertyUnit,
  PropertyReference,
  BaseProperty,
  // Spalten-Konfiguration
  ColumnKey,
  ColumnConfig,
  // Spaltenbreiten
  ColumnWidth,
  TableColumnConfig,
} from "./table";

// ====================================================================
// Diagramm-Typen
// ====================================================================

export type {
  // Configuration
  DiagramKey,
  DiagramId,
  DataSourceKey,
  DataSourcePath,
  // Hook Return Types
  UseDiagramLayoutReturn,
  UseTooltipReturn,
  // ELK Layout
  ElkLayoutOptions,
  // Floating UI
  FloatingUIReturn,
  // Node & Edge
  NodeDimensions,
  NodeData,
  NodeControlsProps,
  DiagramNode,
  DiagramEdge,
  CustomNodeProps,
  BaseNodeConfig,
  DiagramFactoryOptions,
  TreeFactoryNodeConfig,
  DiagramNodeConfig,
  MainNodeInput,
  DiagramEdgeConfig,
  EdgeParams,
  FlexibleDiagramConfig,
  Store,
  ScrollToOptions,
  RegisteredDiagram,
  // Komponenten-Props
  DiagramTitleProps,
  DiagramControlsProps,
  DiagramFlowProps,
  DiagramTooltipProps,
} from "./diagram";
