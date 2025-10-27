/**
 * Zentrale Konfiguration für Datenquellen
 */
export const DATA_SOURCES = {
  // Prozessketten-Daten 
  PROCESS_CHAINS: "./prozessketten_daten.json",
  
  // Versorgungskonzepte-Daten (neue Struktur)
  SUPPLY_CONCEPTS: "./versorgungskonzepte_daten.json",
  
  // Versorgungsaufgaben-Daten (neue Struktur)
  SUPPLY_TASKS: "./versorgungsaufgaben_daten.json",
  
  // Xdukte-Daten (neue Struktur)
  XDUCTS: "./xdukte_daten.json",
  
  // Konversionsverfahren-Daten (neue Struktur)
  CONVERSION_PROCEDURES: "./konversionsverfahren_daten.json",
  
} as const satisfies Record<string, string>;