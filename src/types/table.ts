import type { ReactElement } from "react";
import type { LocalizedName } from "./localization";

/**
 * Typen für TableComponent und zugehörige Strukturen
 */

// ====================================================================
// Tabellen-Spalten-Konfiguration
// ====================================================================

/**
 * Spalten-Schlüssel für Property-Tabellen
 */
export type ColumnKey = 'property' | 'value' | 'unit' | 'year' | 'source';

/**
 * Konfiguration einer einzelnen Tabellen-Spalte
 */
export type ColumnConfig = {
  key: ColumnKey;
  headerId: string;
  headerDefault: string;
};

// ====================================================================
// Tabellen-Datenstruktur
// ====================================================================

/**
 * Ein einzelnes Tabellendaten-Element
 */
export type TableData<T = unknown> = {
  id: string;
  data: {
    category: LocalizedName;   // Ebene 1 (immer vorhanden)
    group: LocalizedName;      // Ebene 2 (immer vorhanden)
    leaf?: LocalizedName;      // Ebene 3 (optional - nur bei 3-Ebenen-Hierarchie)
    properties?: T[];
  };
};

/**
 * Tabellendaten als Array
 */
export type TableDataArray = TableData[];

// ====================================================================
// TableComponent Props
// ====================================================================

/**
 * Props für die TableComponent (Hauptkomponente)
 * // TableComponent - bekommt nur data + onClose von außen
 */
export type TableComponentProps = {
  data: TableDataArray;
  onClose: () => void; // ← Parent-State-Management
};

/**
 * Props für TableHeader-Komponente
 */
export type TableHeaderProps = {
  displayTitle: ReactElement | string;
  properties: BaseProperty[];
  title: string;
  onClose: () => void;
};

/**
 * Props für TableWrapper-Komponente
 */
export type TableWrapperProps = {
  children: ReactElement;
};

/**
 * Props für TableExport-Komponente
 */
export type TableExportProps = {
  properties: BaseProperty[];
  title: string;
};

// ====================================================================
// Tabellen-Spaltenbreiten
// ====================================================================

/**
 * Einzelne Spaltenbreite
 */
export type ColumnWidth = {
  width: string;
  minWidth: string;
};

/**
 * Komplette Spalten-Konfiguration für Properties-Tabellen
 */
export type TableColumnConfig = {
  property: ColumnWidth;
  value: ColumnWidth;
  unit: ColumnWidth;
  year?: ColumnWidth;
  source: ColumnWidth;
};

// ====================================================================
// Basis-Property-Typen 
// ====================================================================

/**
 * Gemeinsame Unit-Struktur für alle Properties
 */
export type PropertyUnit = LocalizedName & {
  id: number;
  symbol?: string; // Optional: Symbol der Einheit (z.B. "kWh", "€", "m³/m³")
};

/**
 * Gemeinsame Reference-Struktur für alle Properties
 */
export type PropertyReference = {
  id: number | null;
  source: string | null;
};

/**
 * Universelle Property-Struktur mit optionalem Jahr-Feld
 * Verwendet von allen Datentypen (Prozessketten, Konversionsverfahren, etc.)
 * 
 * year?: Mit Jahr → Prozessketten, Versorgungsaufgaben
 * year?: Ohne Jahr → Konversionsverfahren, Xdukte, Versorgungskonzepte
 */
export type BaseProperty = {
  id: number;
  value: number | null;
  year?: number | null;  // Optional: nur bei manchen Datentypen vorhanden
  unit: PropertyUnit;
  property: LocalizedName & {
    id: number;
  };
  reference: PropertyReference;
};
