import type { TreeFactoryNodeConfig, SupplyConceptsCategory } from "@/types";
import { Lightbulb } from "lucide-react";
import { transformData } from "../transformData";
import { filterOutUndefined } from "../transformHelpers";
import { resolveIdPrefixes } from "../../utilityFunctions/configHelpers";
import { DIAGRAMS } from "@/configs/diagramConfigs";
import { tableDataFactories } from "@/functions/tableFunctions";

const config = DIAGRAMS.supply_concepts.config;
const { id, classNames } = config;
const { root, category, group } = classNames;
const idPrefixes = resolveIdPrefixes(config);

/**
 * Transforms versorgungskonzepte_daten.json into TreeFactory structure
 * 
 * Hierarchy: Root → Categories → Groups (Concepts)
 * @param supplyConceptsData Array of supply concept categories
 * @returns TreeFactoryNodeConfig for the complete supply concepts diagram
 */
export function transformSupplyConceptsData(
  supplyConceptsData: SupplyConceptsCategory[]
): TreeFactoryNodeConfig {
  
  return transformData(supplyConceptsData, {
    diagramId: id,
    root: {
      icon: <Lightbulb size={24} />,
      className: root,
    },
    category: {
      idPrefix: idPrefixes.category,
      className: category,
      getGroups: (categoryItem) => categoryItem.concepts || [],
      entities: (categoryItem) => ({ category: categoryItem }),
      values: (count) => ({ count }),
      filter: filterOutUndefined,
    },
    group: {
      idPrefix: idPrefixes.group,
      className: group,
      entities: (groupItem, categoryItem) => ({ group: groupItem, category: categoryItem }),
      values: (propertyCount) => ({ propertyCount }),
      table: (groupItem, categoryItem) => 
        tableDataFactories.supplyConcepts(groupItem, categoryItem),
    },
  });
}