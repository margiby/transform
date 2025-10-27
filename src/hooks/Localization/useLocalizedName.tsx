import { useIntl } from "react-intl";
import { toTitleCase } from "./localizationHelpers";

/**
 * Hook für lokalisierte Namen mit automatischer Großschreibung
 * Wird in Table-Renderern und anderen Komponenten verwendet
 *
 * @returns Funktion die ein Objekt mit name_german/name_english
 * nimmt und lokalisierten Namen zurückgibt
 */
export const useLocalizedName = () => {
  const intl = useIntl();

  return (item: { name_german?: string; name_english?: string }) => {
    const name = intl.locale === "de" ? item.name_german : item.name_english;
    return name ? toTitleCase(name) : "";
  };
};
