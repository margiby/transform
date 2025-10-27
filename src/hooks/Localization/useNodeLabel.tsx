import { useIntl } from "react-intl";
import { ReactNode } from "react";
import {
  isLocalizedName,
  isLocalizableEntity,
  isLocalizedMessage,
  type LocalizedName,
  type LocalizableEntity,
  type LocalizedMessage,
} from "@/types";
import { toTitleCase } from "./localizationHelpers";

/**
 * Hook zum Abrufen des Knotenslabels basierend auf der aktuellen Sprache.
 * Unterstützt verschiedene Label-Typen wie String, LocalizedName, LocalizableEntity,
 *  LocalizedMessage und ReactNode.
 * @returns Funktion, die ein Label entgegennimmt und das entsprechende Knotenlabel zurückgibt.
 */
export const useNodeLabel = () => {
  const intl = useIntl();

  return (
    label:
      | string
      | LocalizedName
      | LocalizableEntity
      | LocalizedMessage
      | ReactNode
  ): string | ReactNode => {
    // Fall 1: String
    if (typeof label === "string") {
      return toTitleCase(label);
    }

    // Fall 2: LocalizedMessage (messageId-basiert, für einfache Labels ohne Platzhalter)
    if (isLocalizedMessage(label)) {
      const translated = intl.formatMessage({ id: label.messageId });
      return toTitleCase(translated);
    }

    // Fall 3: LocalizableEntity (ganzes Objekt - bevorzugt Acronym)
    if (isLocalizableEntity(label)) {
      const hasAcronym = label.acronym_german || label.acronym_english;

      if (hasAcronym) {
        const acronym =
          intl.locale === "de"
            ? label.acronym_german || label.name_german
            : label.acronym_english || label.name_english;
        return toTitleCase(acronym);
      }

      const name =
        intl.locale === "de" ? label.name_german : label.name_english;
      return toTitleCase(name);
    }

    // Fall 4: LocalizedName (einfaches Objekt)
    if (isLocalizedName(label)) {
      const name =
        intl.locale === "de" ? label.name_german : label.name_english;
      return toTitleCase(name);
    }

    // Fall 5: ReactNode - durchreichen
    return label;
  };
};
