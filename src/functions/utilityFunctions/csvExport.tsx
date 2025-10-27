/**
 * CSV Export Utility Functions
 * Generische Funktionen zum Exportieren von Tabellendaten als CSV-Dateien
 * Tabellenspezifische Export-Logik befindet sich in den jeweiligen Table-Komponenten
 */

import fileDownload from 'js-file-download';

// CSV-Konstanten
const CSV_SEPARATOR = ';';
const CSV_BOM = '\uFEFF';

/** 
 * Triggert den Download einer CSV-Datei im Browser
 * Fügt automatisch UTF-8 BOM für Excel-Kompatibilität hinzu
*/
const downloadCSV = (content: string, filename: string): void => {
  fileDownload(CSV_BOM + content, filename);
};

/**
 * Konvertiert einen Titel in einen sicheren Dateinamen
 */
const toFilename = (title: string): string => {
  return title
    .replace(/[<>:"/\\|?*]/g, '_')  // Verbotene Zeichen in Windows/Unix
    .replace(/\s+/g, '_')            // Leerzeichen → Unterstrich
    .replace(/_+/g, '_')             // Mehrfache Unterstriche → einzelner Unterstrich
    .replace(/^_|_$/g, '')           // Unterstriche am Anfang/Ende entfernen
};

/**
 * Escaped einen CSV-Wert (Anführungszeichen, Semikolons, Newlines)
 * Wird für jede Zelle verwendet
 */
const escapeCSVValue = (value: unknown): string => {
  const stringValue = String(value ?? '');
  if (stringValue.includes(CSV_SEPARATOR) || stringValue.includes('"') || stringValue.includes('\n')) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }
  return stringValue;
};

/**
 * Generischer CSV-Export für beliebige Tabellendaten
 * @param data Array von Datenobjekten (Tabellenzeilen)
 * @param columns Array von Spalten-Definitionen (key + header)
 * @param title Titel für die CSV-Datei (wird in Dateinamen verwendet)
 */
export const exportTableToCSV = <T extends Record<string, unknown>>(
  data: T[],
  columns: { key: keyof T; header: string }[],
  title: string
): void => {
  if (data.length === 0) {
    console.warn('Keine Daten zum Exportieren vorhanden');
    return;
  }

  // CSV zusammenbauen: Header + Datenzeilen
  const csvContent = [
    columns.map(col => col.header).join(CSV_SEPARATOR),
    ...data.map(row =>
      columns.map(col => escapeCSVValue(row[col.key])).join(CSV_SEPARATOR)
    )
  ].join('\n');

  // Dateiname mit Timestamp generieren und Download triggern
  const timestamp = new Date().toISOString().split('T')[0];
  const filename = `${toFilename(title)}_${timestamp}.csv`;
  
  downloadCSV(csvContent, filename);
};
