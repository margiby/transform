import type { ColumnConfig, ColumnKey } from "@/types";

/**
 * Spalten-Konfiguration für Property-Tabellen
 * Definiert welche Spalten angezeigt werden (dynamisch mit/ohne Jahr)
 * 
 * @param hasYear - Ob die Jahr-Spalte angezeigt werden soll
 * @returns Array mit Spalten-Konfigurationen
 */
export const getTableColumns = (hasYear: boolean): ColumnConfig[] => {
  return [
    {
      key: 'property',
      headerId: 'property_name',
      headerDefault: 'Eigenschaft',
    },
    {
      key: 'value',
      headerId: 'property_value',
      headerDefault: 'Wert',
    },
    {
      key: 'unit',
      headerId: 'property_unit',
      headerDefault: 'Einheit',
    },
    // Jahr-Spalte nur wenn vorhanden
    ...(hasYear ? [{
      key: 'year' as ColumnKey,
      headerId: 'property_year',
      headerDefault: 'Jahr',
    }] : []),
    {
      key: 'source',
      headerId: 'property_source',
      headerDefault: 'Quelle',
    },
  ];
};
