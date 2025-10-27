/**
 * Transform Functions - Central export file
 * @module transformFunctions 
 * @description Dieses Modul bündelt und exportiert alle Funktionen und Hilfsmittel,
 * die für die Transformation von Daten in der Anwendung verwendet werden.
 * @exports transformData - Die Hauptfunktion zur Transformation von Rohdaten in Diagramm- und Tabellendaten.
 * @exports filterOutUndefined, hasProperties - Hilfsfunktionen für die Datenumwandlung.
 * @exports transformProcessChainsData - Funktion zur Transformation von Prozessketten-Daten.
 * @exports transformSupplyTasksData - Funktion zur Transformation von Versorgungsaufgaben-Daten.
 * @exports transformSupplyConceptsData - Funktion zur Transformation von Versorgungskonzepte-Daten.
 * @exports transformXductsData - Funktion zur Transformation von Xdukte-Daten.
 * @exports transformConversionProceduresData - Funktion zur Transformation von Konversionsverfahren-Daten.
 */

// ==========================================
// Core Transform Function
// ==========================================
export { transformData } from "./transformData";

// Transform Helpers
export { 
  filterOutUndefined, 
  hasProperties
} from "./transformHelpers";

// ==========================================
// Diagram Transform Functions
// ==========================================
export { transformProcessChainsData } from "./diagramTransformers/prozessketten";
export { transformSupplyTasksData } from "./diagramTransformers/versorgungsaufgaben";
export { transformSupplyConceptsData } from "./diagramTransformers/versorgungskonzepte";
export { transformXductsData } from "./diagramTransformers/xdukte";
export { transformConversionProceduresData } from "./diagramTransformers/konversionsverfahren";