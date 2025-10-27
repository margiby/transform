import type {
  TreeFactoryNodeConfig,
  LocalizableEntity,
  TreeTransformConfig,
  BaseProperty,
} from "@/types";
import { generateMessageIds } from "../utilityFunctions/configHelpers";

/**
 * Generische Transform-Funktion für hierarchische Datenstrukturen
 *
 * Unterstützt Hierarchien:
 * - 3-Ebenen: Root → Categories → Groups
 * - 4-Ebenen: Root → Categories → Groups → Leafs
 *
 * @param data Array der Kategorien
 * @param config Konfiguration für die Transformation
 * @returns TreeFactoryNodeConfig für das gesamte Diagramm
 */
export function transformData<
  TCategory extends LocalizableEntity,
  TGroup extends LocalizableEntity,
  TLeaf extends LocalizableEntity
>(
  data: TCategory[],
  config: TreeTransformConfig<TCategory, TGroup, TLeaf>
): TreeFactoryNodeConfig {
  // Destructure config - verwende "Config" suffix um Verwechslung mit Daten zu vermeiden
  const { diagramId, root, category: categoryConfig, group: groupConfig, leaf: leafConfig } = config;
  
  // MessageIds automatisch erzeugen aus der diagramId
  const messageIds = generateMessageIds(diagramId);

  // Callback: Filter anwenden (falls vorhanden)
  const categories = categoryConfig.filter
    ? (data || []).filter(categoryConfig.filter)
    : data || [];

  // Category-Knoten erstellen
  const categoryNodes: TreeFactoryNodeConfig[] = categories.map(
    (categoryItem) => {
      const groups = categoryConfig.getGroups(categoryItem) || [];

      // Group-Knoten erstellen
      const groupNodes: TreeFactoryNodeConfig[] = groups.map((groupItem) => {
        let leafNodes: TreeFactoryNodeConfig[] = [];

        // Leaf-Knoten erstellen (falls konfiguriert)
        if (leafConfig && groupConfig.getLeafs) {
          const leafs = groupConfig.getLeafs(groupItem) || [];

          leafNodes = leafs.map((leafItem) => {
            const leafWithProps = leafItem as LocalizableEntity<BaseProperty[]>;

            const baseData = {
              label: leafItem,
              description: {
                messageId: messageIds.leafDescription,
                ...(leafConfig.entities && {
                  entities: leafConfig.entities(leafItem, groupItem, categoryItem),
                }),
                ...(leafConfig.values && {
                  values: leafConfig.values(leafItem),
                }),
              },
              // Automatisch propertyCount hinzufügen
              propertyCount: leafWithProps.properties?.length || 0,
            };

            return {
              id: `${leafConfig.idPrefix}-${leafItem.id}`,
              data: { 
                ...baseData,
                // Table hinzufügen, wenn konfiguriert
                ...(leafConfig.table && {
                  table: leafConfig.table(leafItem, groupItem, categoryItem)
                }),
              },
              className: leafConfig.className,
            };
          });
        }

        // Group-Knoten mit oder ohne Leafs zurückgeben
        const groupWithProps = groupItem as LocalizableEntity<BaseProperty[]>;
        const groupPropertyCount = groupWithProps.properties?.length || 0;
        const groupValueCount = leafConfig ? leafNodes.length : groupPropertyCount;

        return {
          id: `${groupConfig.idPrefix}-${groupItem.id}`,
          data: {
            label: groupItem,
            description: {
              messageId: messageIds.groupDescription,
              ...(groupConfig.entities && {
                entities: groupConfig.entities(groupItem, categoryItem),
              }),
              ...(groupConfig.values && {
                values: groupConfig.values(groupValueCount),
              }),
            },
            // Automatisch propertyCount hinzufügen
            propertyCount: groupPropertyCount,
            // Table hinzufügen, wenn konfiguriert
            ...(groupConfig.table && {
              table: groupConfig.table(groupItem, categoryItem)
            }),
          },
          children: leafNodes,
          className: groupConfig.className,
        };
      });

      // Category-Knoten zurückgeben
      return {
        id: `${categoryConfig.idPrefix}-${categoryItem.id}`,
        data: {
          label: categoryItem,
          description: {
            messageId: messageIds.categoryDescription,
            ...(categoryConfig.entities && {
              entities: categoryConfig.entities(categoryItem),
            }),
            ...(categoryConfig.values && {
              values: categoryConfig.values(groupNodes.length),
            }),
          },
        },
        children: groupNodes,
        className: categoryConfig.className,
      };
    }
  );

  // Root-Node erstellen
  const rootNode: TreeFactoryNodeConfig = {
    id: messageIds.rootLabel,
    data: {
      icon: root.icon,
      label: { messageId: messageIds.rootLabel },
      description: {
        messageId: messageIds.rootDescription,
        ...(root.values && {
          values: root.values(categoryNodes.length),
        }),
      },
    },
    className: root.className,
    children: categoryNodes,
  };

  return rootNode;
}
