import type { TreeFactoryNodeConfig, ConversionProceduresCategory } from "@/types";
import { Settings } from "lucide-react";
import { transformData } from "../transformData";
import { filterOutUndefined } from "../transformHelpers";
import { resolveIdPrefixes } from "../../utilityFunctions/configHelpers";
import { DIAGRAMS } from "@/configs/diagramConfigs";
import { tableDataFactories } from "@/functions/tableFunctions";

const config = DIAGRAMS.conversion_procedures.config;
const { id, classNames } = config;
const { root, category, group } = classNames;
const idPrefixes = resolveIdPrefixes(config);

/**
 * Transforms konversionsverfahren_daten.json into TreeFactory structure
 * 
 * Hierarchy: Root → Categories → Groups (Components)
 * @param conversionProceduresData Array of conversion procedure categories
 * @returns TreeFactoryNodeConfig for the complete conversion procedures diagram
 */
export function transformConversionProceduresData(
  conversionProceduresData: ConversionProceduresCategory[]
): TreeFactoryNodeConfig {
  
  return transformData(conversionProceduresData, {
    diagramId: id,
    root: {
      icon: <Settings size={24} />,
      className: root,
    },
    category: {
      idPrefix: idPrefixes.category,
      className: category,
      getGroups: (categoryItem) => categoryItem.components || [],
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
        tableDataFactories.conversionProcedures(groupItem, categoryItem),
    },
  });
}
