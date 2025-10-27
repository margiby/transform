import type { TableColumnConfig } from "@/types";

/**
 * Spaltenbreiten für 5-Spalten-Tabelle (mit Jahr)
 */
export const TABLE_COLUMNS_WITH_YEAR: TableColumnConfig = {
  property: { width: '25%', minWidth: '90px' },
  value: { width: '15%', minWidth: '70px' },
  unit: { width: '15%', minWidth: '80px' },
  year: { width: '10%', minWidth: '60px' },
  source: { width: '35%', minWidth: '250px' },
};

/**
 * Spaltenbreiten für 4-Spalten-Tabelle (ohne Jahr)
 */
export const TABLE_COLUMNS_WITHOUT_YEAR: TableColumnConfig = {
  property: { width: '25%', minWidth: '90px' },
  value: { width: '20%', minWidth: '70px' },
  unit: { width: '15%', minWidth: '80px' },
  source: { width: '40%', minWidth: '250px' },
};
