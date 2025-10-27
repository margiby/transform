/**
 * Localization Hooks and Utilities
 * @module localization
 * @description Dieses Modul bündelt und exportiert alle benutzerdefinierten React-Hooks 
 * und Hilfsfunktionen, die für die Lokalisierung in der Anwendung verwendet werden.
 * @exports toTitleCase - Funktion zur Umwandlung von Text in Titel-Case.
 * @exports getLocalizedName - Funktion zum Abrufen des lokalisierten Namens eines Elements.
 * @exports getDisplayLabel - Funktion zum Abrufen des Anzeigelabels basierend auf der aktuellen Sprache.
 * @exports toLocalizedName - Funktion zur Umwandlung eines Namens in seine lokalisierte Version.
 * @exports useLocalizedName - Hook zum Abrufen des lokalisierten Namens innerhalb von React-Komponenten.
 * @exports useNodeLabel - Hook zum Abrufen des Knotenslabels basierend auf der aktuellen Sprache.
 */

export {
  toTitleCase,
  getLocalizedName,
  getDisplayLabel,
  toLocalizedName,
} from "./localizationHelpers";
export { useLocalizedName } from "./useLocalizedName";
export { useNodeLabel } from "./useNodeLabel";

