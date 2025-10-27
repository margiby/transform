import type { ReactNode } from "react";
import type { LocalizableEntity } from "./localization";
import type { BaseProperty, TableDataArray } from "./table";
import type { DiagramKey } from "./diagram";

// ====================================================================
// Tree Transform Config
// ====================================================================

/**
 * Typen für die Konfiguration der generischen Tree‑Transform‑Funktion.
 *
 * @template TCategory Eingabe‑Typ für Kategorien
 * @template TGroup Eingabe‑Typ für Gruppen (innerhalb einer Kategorie)
 * @template TLeaf  Eingabe‑Typ für Leafs (falls vorhanden)
 */
export type TreeTransformConfig<TCategory, TGroup, TLeaf> = {
  // Diagram ID für automatische messageId-Generierung
  diagramId: DiagramKey;

  // Root-Node Konfiguration
  root: {
    icon: ReactNode;
    className: string;
    values?: (categoryCount: number) => Record<string, string | number>;
  };

  // Category-Ebene Konfiguration
  category: {
    idPrefix: string; 
    className: string;
    getGroups: (categoryItem: TCategory) => TGroup[];
    entities?: (categoryItem: TCategory) => Record<string, LocalizableEntity>;
    values?: (groupCount: number) => Record<string, string | number>;
    filter?: (categoryItem: TCategory) => boolean;
  };

  // Group-Ebene Konfiguration
  group: {
    idPrefix: string;
    className: string;
    getLeafs?: (groupItem: TGroup) => TLeaf[] | null;
    entities?: (groupItem: TGroup, categoryItem: TCategory) => Record<string, LocalizableEntity>;
    values?: (leafCount: number) => Record<string, string | number>;
    table?: (groupItem: TGroup, categoryItem: TCategory) => TableDataArray;
  };

  // Leaf-Ebene Konfiguration (optional)
  leaf?: {
    idPrefix: string;
    className: string;
    entities?: (leafItem: TLeaf, groupItem: TGroup, categoryItem: TCategory) => Record<string, LocalizableEntity>;
    values?: (leafItem: TLeaf) => Record<string, string | number>;
    table?: (leafItem: TLeaf, groupItem: TGroup, categoryItem: TCategory) => TableDataArray;
  };
};

// ====================================================================
// Diagram Configuration Types
// ====================================================================

/**
 * CSS-Klassennamen für die verschiedenen Ebenen eines Diagramms
 */
export type DiagramClassNames = {
  root: string;
  category: string;
  group: string;
  leaf?: string;
};

/**
 * ID-Präfixe für Diagramm-Ebenen
 */
export type DiagramIdPrefixes = {
  category?: string;
  group?: string;
  leaf?: string;
};

/**
 * Basis-Konfiguration für ein Diagramm (ohne id)
 * Wird in DIAGRAMS_BASE verwendet
 */
export type DiagramConfigBase = {
  classNames: DiagramClassNames;
  idPrefixes?: DiagramIdPrefixes;
};

/**
 * Vollständige Konfiguration für ein Diagramm
 * Enthält ID, Klassennamen und ID-Präfixe
 * 
 * idPrefixes sind optional - wenn nicht angegeben, werden sie automatisch generiert:
 * - category: "category" (Standard)
 * - group: "{diagramId}-group" oder custom
 * - leaf: "{diagramId}-leaf" oder custom
 */
export type DiagramConfig = DiagramConfigBase & {
  id: DiagramKey;
};

// ====================================================================
// Diagram-Specific Data Types
// Category (Level 1) → Group (Level 2) → Leaf (Level 3)
// ====================================================================

/**
 * ProcessChains Types (3-Level)
 */
export type ProcessChainsLeaf = LocalizableEntity<BaseProperty[]>;

export type ProcessChainsGroup = LocalizableEntity & {
  chains: ProcessChainsLeaf[] | null;
};

export type ProcessChainsCategory = LocalizableEntity & {
  groups: ProcessChainsGroup[] | null;
};

/**
 * ConversionProcedures Types (2-Level)
 */
export type ConversionProceduresGroup = LocalizableEntity<BaseProperty[]>;

export type ConversionProceduresCategory = LocalizableEntity & {
  components: ConversionProceduresGroup[] | null;
};

/**
 * SupplyTasks Types (2-Level)
 */
export type SupplyTasksGroup = LocalizableEntity<BaseProperty[]>;

export type SupplyTasksCategory = LocalizableEntity & {
  tasks: SupplyTasksGroup[] | null;
};

/**
 * SupplyConcepts Types (2-Level)
 */
export type SupplyConceptsGroup = LocalizableEntity<BaseProperty[]>;

export type SupplyConceptsCategory = LocalizableEntity & {
  concepts: SupplyConceptsGroup[] | null;
};

/**
 * Xducts Types (3-Level)
 */
export type XductsLeaf = LocalizableEntity<BaseProperty[]>;

export type XductsGroup = LocalizableEntity & {
  xducts: XductsLeaf[] | null;
};

export type XductsCategory = LocalizableEntity & {
  xduct_groups: XductsGroup[] | null;
};

// ====================================================================
// Diagram Data Type Mapping
// ====================================================================

/**
 * Mappt jede DiagramKey zu ihrem entsprechenden Category-Array-Typ
 */
export type DiagramDataMap = {
  process_chains: ProcessChainsCategory[];
  supply_tasks: SupplyTasksCategory[];
  supply_concepts: SupplyConceptsCategory[];
  xducts: XductsCategory[];
  conversion_procedures: ConversionProceduresCategory[];
};
