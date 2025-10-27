/**
 * Table Functions - Central export file
 * @module tableFunctions
 * @description Dieses Modul bündelt und exportiert alle Funktionen und Hilfsmittel, 
 * die für die Arbeit mit Tabellen in der Anwendung verwendet werden.
 * @exports tableDataFactories - Fabriken zur Erstellung von Tabellendaten.
 * @exports exportPropertyToCSV - Funktion zum Exportieren von Eigenschaften in eine CSV-Datei.
 * @exports isPropertyData, hasYearField - Type Guards zur Überprüfung von Tabellendatenstrukturen.
 * @exports getColumnStyle, renderPropertyCell - Helper-Funktionen für Property-Tabellen.
 */

// Table Data Factory
export { tableDataFactories } from './tableDataFactory';

// CSV Export
export { exportPropertyToCSV } from './tableCSVExport';

// Type Guards
export { isPropertyData, hasYearField } from './typeGuards';

// Property Table Helpers
export { getColumnStyle, renderPropertyCell } from './propertyTableHelpers';
