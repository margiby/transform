import type { DataSourcePath, DiagramFactoryOptions, DiagramKey, DiagramIdPrefixes } from "@/types";

/**
 * Config Helper Functions
 * Utility-Funktionen für die Verarbeitung von Konfigurations-Objekten
 */

/**
 * Generiert automatisch MessageIds basierend auf der diagramId
 *
 * @param diagramId Die ID des Diagramms
 * @returns Objekt mit allen MessageIds für das Diagramm
 */
export function generateMessageIds(diagramId: DiagramKey) {
  return {
    rootLabel: `${diagramId}_label`,
    rootDescription: `${diagramId}_root_description`,
    categoryDescription: `${diagramId}_category_description`,
    groupDescription: `${diagramId}_group_description`,
    leafDescription: `${diagramId}_leaf_description`,
  };
}

/**
 * Generiert automatisch ID-Präfixe für ein Diagramm
 *
 * Defaults:
 * - category: "category" (Standard für alle)
 * - group: "group"
 * - leaf: "leaf"
 *
 * @param config DiagramConfig mit optionalen idPrefixes
 * @returns Vollständige idPrefixes mit Defaults
 */
export function resolveIdPrefixes(config: {
  id: DiagramKey;
  idPrefixes?: DiagramIdPrefixes;
}): Required<DiagramIdPrefixes> {
  return {
    category: config.idPrefixes?.category ?? "category",
    group: config.idPrefixes?.group ?? "group",
    leaf: config.idPrefixes?.leaf ?? "leaf",
  };
}

/**
 * Helper-Funktion: Fügt automatisch `id` zu jedem diagram config hinzu
 * 
 * @param base - Base config object ohne IDs
 * @returns Object mit id in jedem config
 */
export function addIdsToConfigs<
  T extends Record<string, { config: object; dataSource: DataSourcePath; factoryOptions: DiagramFactoryOptions }>
>(base: T): {
  [K in keyof T]: T[K] & { config: T[K]["config"] & { id: K } }
} {
  const result = {} as {
    [K in keyof T]: T[K] & { config: T[K]["config"] & { id: K } }
  };
  
  for (const key in base) {
    if (Object.prototype.hasOwnProperty.call(base, key)) {
      result[key] = {
        ...base[key],
        config: {
          ...base[key].config,
          id: key,
        },
      } as T[typeof key] & { config: T[typeof key]["config"] & { id: typeof key } };
    }
  }
  
  return result;
}
