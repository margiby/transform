/**
 * Zentrale Hilfsfunktionen für Lokalisierung und Text-Formatierung
 * Verwendet in Transform-Funktionen und Table-Renderern
 */

import type { LocalizedName, LocalizableEntity } from "@/types";

/**
 * Hilfsfunktion für Title Case-Konvertierung
 * Kapitalisiert den ersten Buchstaben jedes Wortes, wenn es komplett lowercase ist
 */
export const toTitleCase = (text: string): string => {
  return text.split(' ').map((word: string) => {
    // Kapitalisiere nur, wenn das Wort komplett lowercase ist
    if (word === word.toLowerCase()) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }
    return word;
  }).join(' ');
};

/**
 * Hilfsfunktion für lokalisierte Namen
 * Wählt basierend auf der Sprache den richtigen Namen aus
 * 
 * @param name - LocalizedName-Objekt mit name_german und name_english
 * @param language - Sprachcode: "de" oder "en"
 * @param applyTitleCase - Optional: Title Case anwenden (default: true)
 */
export const getLocalizedName = (
  name: LocalizedName,
  language: string,
  applyTitleCase: boolean = true
): string => {
  const text = language === "de" ? name.name_german : name.name_english;
  return applyTitleCase ? toTitleCase(text) : text;
};

/**
 * Hilfsfunktion für Display-Label (Name oder Akronym)
 * Bevorzugt Akronym, wenn vorhanden, sonst lokalisierten Namen
 * 
 * @param entity - LocalizableEntity mit name und optionalem acronym
 * @param language - Sprachcode: "de" oder "en"
 */
export const getDisplayLabel = (
  entity: LocalizableEntity,
  language: string
): string => {
  const acronym = language === "de" ? entity.acronym_german : entity.acronym_english;
  return acronym || getLocalizedName(entity, language);
};

/**
 * Hilfsfunktion: Entity -> LocalizedName-Form
 * Konvertiert eine Entity zu einem LocalizedName-Objekt
 * 
 * @param source - Objekt mit name_german und name_english
 * @returns LocalizedName-Objekt
 */
export const toLocalizedName = (source: {
  name_german: string;
  name_english: string;
}): LocalizedName => ({
  name_english: source.name_english,
  name_german: source.name_german,
});
