import type { TreeFactoryNodeConfig, SupplyTasksCategory } from "@/types";
import { ListTodo } from "lucide-react";
import { transformData } from "../transformData";
import { filterOutUndefined } from "../transformHelpers";
import { resolveIdPrefixes } from "../../utilityFunctions/configHelpers";
import { DIAGRAMS } from "@/configs/diagramConfigs";
import { tableDataFactories } from "@/functions/tableFunctions";

const config = DIAGRAMS.supply_tasks.config;
const { id, classNames } = config;
const { root, category, group } = classNames;
const idPrefixes = resolveIdPrefixes(config);

/**
 * Transforms versorgungsaufgaben_daten.json into TreeFactory structure
 * 
 * Hierarchy: Root → Categories → Groups (Tasks)
 * @param supplyTasksData Array of supply task categories
 * @returns TreeFactoryNodeConfig for the complete supply tasks diagram
 */
export function transformSupplyTasksData(
  supplyTasksData: SupplyTasksCategory[]
): TreeFactoryNodeConfig {
  
  return transformData(supplyTasksData, {
    diagramId: id,
    root: {
      icon: <ListTodo size={24} />,
      className: root,
    },
    category: {
      idPrefix: idPrefixes.category,
      className: category,
      getGroups: (categoryItem) => categoryItem.tasks || [],
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
        tableDataFactories.supplyTasks(groupItem, categoryItem),
    },
  });
}
