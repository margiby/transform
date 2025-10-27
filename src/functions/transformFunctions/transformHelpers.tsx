import type { LocalizableEntity, BaseProperty } from "@/types";

/**
 * Hilfsfunktionen für die Transform-Funktionen
 */

/**
 * Filtert Kategorien aus, deren name_english "undefined" ist.
 */
export function filterOutUndefined<T extends LocalizableEntity>(
  item: T
): boolean {
  return item.name_english !== "undefined";
}

/**
 * Prüft ob ein Item Properties hat
 * Verwendet Type Guard für sichere Typenprüfung
 * @param item Das zu prüfende Item
 * @returns true wenn Properties existieren, sonst false
 */
export function hasProperties(item: unknown): boolean {
  if (!item || typeof item !== "object") {
    return false;
  }
  const entity = item as { properties?: BaseProperty[] };
  return !!(
    entity.properties &&
    Array.isArray(entity.properties) &&
    entity.properties.length > 0
  );
}
