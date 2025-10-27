import type { BaseProperty } from "@/types";
import type { IntlShape } from "react-intl";
import { getLocalizedName } from "@/hooks/Localization/localizationHelpers";
import { exportTableToCSV } from "@/functions/utilityFunctions/csvExport";
import { getTableColumns } from "@/configs/tableConfigs";
import { hasYearField } from "./typeGuards";

/**
 * CSV-Export für Property-Tabellen
 * Exportiert Properties als CSV-Datei (dynamisch mit/ohne Jahr-Spalte)
 */
export const exportPropertyToCSV = (
  properties: BaseProperty[], 
  title: string,
  intl: IntlShape,
  language: string
): void => {
  const hasYear = hasYearField(properties);
  const columns = getTableColumns(hasYear);

  // Lokalisierte "Keine Angabe" / "n/a"
  const notAvailable = intl.formatMessage({ 
    id: 'not_available', 
    defaultMessage: 'n/a' 
  });

  // Übersetzte Header erstellen
  const headers: Record<string, string> = {
    property_name: intl.formatMessage({ id: 'property_name', defaultMessage: 'Eigenschaft' }),
    property_value: intl.formatMessage({ id: 'property_value', defaultMessage: 'Wert' }),
    property_unit: intl.formatMessage({ id: 'property_unit', defaultMessage: 'Einheit' }),
    property_year: intl.formatMessage({ id: 'property_year', defaultMessage: 'Jahr' }),
    property_source: intl.formatMessage({ id: 'property_source', defaultMessage: 'Quelle' }),
  };

  // Daten transformieren
  const rows = properties.map(prop => {
    const row: Record<string, string | number> = {
      property: getLocalizedName(prop.property, language),
      value: prop.value !== null ? prop.value.toLocaleString() : notAvailable,
      // Bevorzuge symbol-Feld für CSV-Export, fallback auf lokalisierte Namen
      unit: prop.unit.symbol || getLocalizedName(prop.unit, language),
    };

    if (hasYear && prop.year !== undefined) {
      row.year = prop.year !== null ? prop.year : notAvailable;
    }

    row.source = prop.reference.source || '';

    return row;
  });

  // Spalten-Definitionen für CSV-Export
  const csvColumns = columns.map(col => ({
    key: col.key,
    header: headers[col.headerId] || col.headerDefault
  }));

  // Export-Funktion aufrufen
  exportTableToCSV(rows, csvColumns, title);
};

