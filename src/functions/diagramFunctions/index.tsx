/**
 * Diagramm-spezifische Utility-Funktionen
 * @module diagramFunctions
 * @description Dieses Modul enthält verschiedene Utility-Funktionen, 
 * die für die Arbeit mit Diagrammen in der Anwendung verwendet werden.
 * @exports getLayoutedElements - Funktion zur Berechnung von ELK-Layouts für Diagrammelemente.
 * @exports getEdgeParams - Funktion zur Berechnung von Kantenparametern für schwebende Kanten.
 * @exports getNodeIntersection - Funktion zur Bestimmung des Schnittpunkts zwischen Knoten und Kanten.
 * @exports diagramNodeClickHandler - Handler-Funktion für Klick-Ereignisse auf Diagrammknoten.
 * @exports loadDiagramOnDemand - Funktion zum Laden von Diagrammen bei Bedarf.
 */

// ELK Layout-Berechnungen
export { getLayoutedElements } from './elkLayout-utils';

// Floating Edge Utilities
export { getEdgeParams, getNodeIntersection } from './floatingEdgeUtils';

// Diagramm Node Click Handler
export { default as diagramNodeClickHandler } from './diagramNodeClickHandler';

// On-Demand Diagram Loading
export { loadDiagramOnDemand } from './loadDiagramOnDemand';
