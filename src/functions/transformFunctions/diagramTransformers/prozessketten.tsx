import type { TreeFactoryNodeConfig, ProcessChainsCategory } from "@/types";
import { Network } from "lucide-react";
import { transformData } from "../transformData";
import { filterOutUndefined } from "../transformHelpers";
import { resolveIdPrefixes } from "../../utilityFunctions/configHelpers";
import { DIAGRAMS } from "@/configs/diagramConfigs";
import { tableDataFactories } from "@/functions/tableFunctions";

const config = DIAGRAMS.process_chains.config;
const { id, classNames } = config;
const { root, category, group, leaf } = classNames;
const idPrefixes = resolveIdPrefixes(config);

/**
 * Transforms prozessketten_daten.json into TreeFactory structure
 * 
 * Hierarchy: Root → Categories → Groups → Leaf (Chains)
 * @param processData Array of process chain categories
 * @returns TreeFactoryNodeConfig for the complete process chains diagram
 */
export function transformProcessChainsData(
  processData: ProcessChainsCategory[]
): TreeFactoryNodeConfig {
  
  return transformData(processData, {
    diagramId: id,
    root: {
      icon: <Network size={24} />,
      className: root,
    },
    category: {
      idPrefix: idPrefixes.category,
      className: category,
      getGroups: (categoryItem) => categoryItem.groups || [],
      values: (count) => ({ count }),
      filter: filterOutUndefined,
    },
    group: {
      idPrefix: idPrefixes.group,
      className: group,
      getLeafs: (groupItem) => groupItem.chains,
      entities: (groupItem) => ({ group: groupItem }),
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
        tableDataFactories.processChains(leafItem, groupItem, categoryItem),
    },
  });
}
