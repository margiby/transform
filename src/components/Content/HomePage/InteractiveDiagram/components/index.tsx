/**
 * React-Komponenten für das interaktive Diagramm
 * @module interactiveDiagramComponents
 * @description Dieses Modul bündelt und exportiert alle React-Komponenten, 
 * die für das interaktive Diagramm in der Anwendung verwendet werden.
 * @exports customNodeTypes - Benutzerdefinierte Node-Komponenten für das Diagramm.
 * @exports customEdgeTypes - Benutzerdefinierte Edge-Komponenten für das Diagramm.
 * @exports DiagramControls - Steuerungskomponente für das Diagramm (Zoom, Pan, etc.).
 * @exports DiagramTitle - Titelkomponente für das Diagramm.
 * @exports DiagramTooltip - Tooltip-Komponente für das Diagramm.
 */

// Node-Komponenten
export { default as customNodeTypes } from './nodes/customNodeTypes';

// Edge-Komponenten
export { default as customEdgeTypes } from './edges/customEdgeTypes';

// Weitere Komponenten
export { default as DiagramControls } from './DiagramControls';
export { default as DiagramTitle } from './DiagramTitle';
export { default as DiagramTooltip } from './DiagramTooltip';

//Enthält TableComponent
// export { default as TableComponent } from './TableComponent';