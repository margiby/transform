/**
  * Registry Functions - Central export file
  * @module registryFunctions
  * @description Dieses Modul bündelt und exportiert alle Funktionen und Hilfsmittel, 
  * die für die Registrierung und Verwaltung von Diagrammen in der Anwendung verwendet werden.
  * @exports diagramRegistry - Das zentrale Registry-Objekt für Diagramme.
  * @exports isDiagramRegistered - Funktion zur Überprüfung, ob ein Diagramm im Registry vorhanden ist.
  * @exports getDiagram - Funktion zum Abrufen eines registrierten Diagramms.
  * @exports getTreeDiagram - Funktion zum Abrufen eines Baumdiagramms.
  * @exports registerDiagram - Hilfsfunktion zur Registrierung eines neuen Diagramms.
  * @exports tryRegisterDiagram - Funktion zum Versuch der Registrierung eines neuen Diagramms.
  * @exports prepareTreeConfig - Hilfsfunktion zur Vorbereitung der Konfiguration für Baumdiagramme.
  * @exports initTreeConfig - Funktion zur Initialisierung der Baumdiagramm-Konfiguration.
  * @exports registerMainDiagram - Funktion zur Registrierung des Hauptdiagramms.
 */

// ====================================================================
// Store & Type Guards
// ====================================================================
export {
  diagramRegistry,
  isDiagramRegistered,
  getDiagram,
  getTreeDiagram,
} from "./registryStore";

// ====================================================================
// Diagram Registration Helpers
// ====================================================================
export {
  registerDiagram,
  tryRegisterDiagram,
  prepareTreeConfig,
  initTreeConfig,
} from "./registryHelpers";

// ====================================================================
// Diagram Registration
// ====================================================================
export { registerMainDiagram } from "./mainDiagramRegistry";
