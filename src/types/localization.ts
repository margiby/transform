/**
 * Zentrale Typen für Lokalisierung
 * Enthält alle Basis-Typen für mehrsprachige Inhalte.
 */

// ====================================================================
// Basis-Typen für Lokalisierung
// ====================================================================

/**
 * Entity mit lokalisierten Namen (nur Namen)
 */
export type LocalizedName = {
  name_german: string;
  name_english: string;
};

/**
 * Entity mit erweiterten Lokalisierungsoptionen
 * Includes ID, optionale Acronyme und optionale Properties
 * Generic T ermöglicht verschiedene Property-Typen (z.B. BaseProperty[])
 */
export type LocalizableEntity<T = unknown> = {
  id: number | string;
  name_german: string;
  name_english: string;
  acronym_german?: string;
  acronym_english?: string;
  properties?: T;
};

/**
 * Message mit lokalisierten Werten
 * Verwendet für i18n-Messages
 * Use-Case: UI‑Text, Labels, Beschreibungen mit optionalen Entity-Referenzen
 */
export type LocalizedMessage = {
  messageId: string;
  values?: Record<string, string | number | LocalizedName>;
  entities?: Record<string, LocalizableEntity>;
};

// ====================================================================
// Type Guards: eine Funktion, die zur Laufzeit prüft, ob ein Wert
// einem bestimmten TypeScript‑Typ entspricht und dabei 
// den TypeScript‑Type Narrowing Mechanismus auslöst.
// ====================================================================

/**
 * Type Guards für Lokalisierungs-Typen
 * @param value  Wert zum Prüfen
 * @returns  true, wenn value ein LocalizedName ist
 * @returns  true, wenn value ein LocalizableEntity ist
 * @returns  true, wenn value ein LocalizedMessage ist
 */
export const isLocalizedName = (value: unknown): value is LocalizedName => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'name_german' in value &&
    'name_english' in value
  );
};

export const isLocalizableEntity = (value: unknown): value is LocalizableEntity => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'name_german' in value &&
    'name_english' in value
  );
};

export const isLocalizedMessage = (
  value: unknown
): value is LocalizedMessage => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'messageId' in value
  );
};
