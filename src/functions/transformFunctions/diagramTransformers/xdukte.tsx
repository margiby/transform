import type { TreeFactoryNodeConfig, XductsCategory } from "@/types";
import { Atom } from "lucide-react";
import { transformData } from "../transformData";
import { filterOutUndefined } from "../transformHelpers";
import { resolveIdPrefixes } from "../../utilityFunctions/configHelpers";
import { DIAGRAMS } from "@/configs/diagramConfigs";
import { tableDataFactories } from "@/functions/tableFunctions";

const config = DIAGRAMS.xducts.config;
const { id, classNames } = config;
const { root, category, group, leaf } = classNames;
const idPrefixes = resolveIdPrefixes(config);

/**
 * Transforms xdukte_daten.json into TreeFactory structure
 * 
 * Hierarchy: Root → Categories → Groups → Leaf (Xducts)
 * @param xductsData Array of xduct categories
 * @returns TreeFactoryNodeConfig for the complete xducts diagram
 */
export function transformXductsData(
  xductsData: XductsCategory[]
): TreeFactoryNodeConfig {
  console.log("[Transform] transformXductsData() called");
  
  return transformData(xductsData, {
    diagramId: id,
    root: {
      icon: <Atom size={24} />,
      className: root,
      values: (categoryCount) => ({ categoryCount }),
    },
    category: {
      idPrefix: idPrefixes.category,
      className: category,
      getGroups: (categoryItem) => categoryItem.xduct_groups || [],
      entities: (categoryItem) => ({ category: categoryItem }),
      values: (count) => ({ count }),
      filter: filterOutUndefined,
    },
    group: {
      idPrefix: idPrefixes.group,
      className: group,
      getLeafs: (groupItem) => groupItem.xducts,
      entities: (groupItem, categoryItem) => ({ group: groupItem, category: categoryItem }),
      values: (count) => ({ count }),
    },
    leaf: {
      idPrefix: idPrefixes.leaf!,
      className: leaf!,
      entities: (leafItem, groupItem, categoryItem) => ({ 
        leaf: leafItem, 
        group: groupItem, 
        category: categoryItem 
      }),
      values: (leafItem) => ({ 
        propertyCount: leafItem.properties?.length ?? 0
      }),
      table: (leafItem, groupItem, categoryItem) => 
        tableDataFactories.xducts(leafItem, groupItem, categoryItem),
    },
  });
}
