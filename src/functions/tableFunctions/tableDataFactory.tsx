import type { 
  TableData, 
  BaseProperty,
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
} from "@/types";
import { toLocalizedName } from "@/hooks/Localization";

/**
 * Factory-Funktionen zur Erstellung von TableData für verschiedene Diagrammtypen
 */
export const tableDataFactories = {
 
  /**
   * ProcessChains: Category → Group → Leaf (3-Level, with year)
   */
  processChains: (
    leafItem: ProcessChainsLeaf,         // Leaf level (Chain)
    groupItem: ProcessChainsGroup,       // Group level
    categoryItem: ProcessChainsCategory  // Category level
  ): TableData<BaseProperty>[] => [{
    id: `chain-properties-${leafItem.id}`,
    data: {
      category: toLocalizedName(categoryItem),  // Level 1: Category
      group: toLocalizedName(groupItem),        // Level 2: Group
      leaf: toLocalizedName(leafItem),          // Level 3: Leaf (has properties)
      properties: leafItem.properties,
    },
  }],

  /**
   * ConversionProcedures: Category → Group (2-Level, without year)
   */
  conversionProcedures: (
    groupItem: ConversionProceduresGroup,      // Group level (Component)
    categoryItem: ConversionProceduresCategory // Category level
  ): TableData<BaseProperty>[] => [{
    id: `component-properties-${groupItem.id}`,
    data: {
      category: toLocalizedName(categoryItem),  // Level 1: Category
      group: toLocalizedName(groupItem),        // Level 2: Group (has properties)
      // leaf: undefined - only 2 levels
      properties: groupItem.properties,
    },
  }],

  /**
   * SupplyTasks: Category → Group (2-Level, with year)
   */
  supplyTasks: (
    groupItem: SupplyTasksGroup,        // Group level (Task)
    categoryItem: SupplyTasksCategory   // Category level
  ): TableData<BaseProperty>[] => [{
    id: `task-properties-${groupItem.id}`,
    data: {
      category: toLocalizedName(categoryItem),  // Level 1: Category
      group: toLocalizedName(groupItem),        // Level 2: Group (has properties)
      properties: groupItem.properties,
    },
  }],

  /**
   * SupplyConcepts: Category → Group (2-Level, without year)
   */
  supplyConcepts: (
    groupItem: SupplyConceptsGroup,     // Group level (Concept)
    categoryItem: SupplyConceptsCategory // Category level
  ): TableData<BaseProperty>[] => [{
    id: `concept-properties-${groupItem.id}`,
    data: {
      category: toLocalizedName(categoryItem),  // Level 1: Category
      group: toLocalizedName(groupItem),        // Level 2: Group (has properties)
      properties: groupItem.properties,
    },
  }],

  /**
   * Xducts: Category → Group → Leaf (3-Level, without year)
   */
  xducts: (
    leafItem: XductsLeaf,                 // Leaf level (Xduct)
    groupItem: XductsGroup,               // Group level
    categoryItem: XductsCategory          // Category level
  ): TableData<BaseProperty>[] => [{
    id: `xduct-properties-${leafItem.id}`,
    data: {
      category: toLocalizedName(categoryItem),  // Level 1: Category
      group: toLocalizedName(groupItem),        // Level 2: Group
      leaf: toLocalizedName(leafItem),          // Level 3: Leaf (has properties)
      properties: leafItem.properties,
    },
  }],

};
