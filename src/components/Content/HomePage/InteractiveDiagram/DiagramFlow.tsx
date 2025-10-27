import type { ReactElement } from "react";
import { ReactFlow, Controls, MiniMap } from "@xyflow/react";
import { FormattedMessage } from "react-intl";
import customEdgeTypes from "./components/edges/customEdgeTypes";
import customNodeTypes from "./components/nodes/customNodeTypes";
import { default as DiagramTooltip } from "./components/DiagramTooltip";
import { LoadingSpinner } from "@/components/common";
import type { DiagramFlowProps } from "@/types";

/**
 * React Flow Diagramm-Komponente
 * 
 * Rendert das interaktive Diagramm mit ReactFlow.
 * Enthält:
 * - ReactFlow Canvas mit Nodes und Edges
 * - Zoom- und Navigations-Controls
 * - Tooltip für Node-Beschreibungen
 */
const DiagramFlow = ({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onNodeClick,
  onNodeMouseEnter,
  onNodeMouseLeave,
  hasLayouted,
  isLoadingLayout,
  flowContainerRef,
  tooltip,
}: DiagramFlowProps): ReactElement => {
  return (
    <div
      ref={flowContainerRef}
      className={`diagram-reactflow-container ${
        !hasLayouted || isLoadingLayout ? "is-loading" : "loaded"
      }`}
    >
      {/* Ladezustand während Layout-Berechnung */}
      {!hasLayouted ? (
        <LoadingSpinner 
          message={
            <FormattedMessage
              id="diagram_loading"
              defaultMessage="Layout wird berechnet..."
            />
          }
        />
      ) : (
        /* Hauptdiagramm mit ReactFlow */
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange} // Handler für Knotenänderungen (z.B. Position)
          onEdgesChange={onEdgesChange} // Handler für Kantenänderungen
          nodeTypes={customNodeTypes} // Benutzerdefinierte Node-Komponenten
          edgeTypes={customEdgeTypes} // Benutzerdefinierte Edge-Typen
          nodesDraggable={false} // Deaktiviert Drag & Drop für Knoten
          onNodeClick={onNodeClick} // Klick-Handler für Knoten (z.B. Expand/Collapse)
          onNodeMouseEnter={onNodeMouseEnter} // Zeigt Tooltip beim Hover
          onNodeMouseLeave={onNodeMouseLeave} // Versteckt Tooltip
          attributionPosition="bottom-right" // Position des ReactFlow-Logos
          minZoom={0.6} // Minimaler Zoomfaktor
          panOnScroll={true} // Ermöglicht Pan mit Mausrad
          fitView // Passt Ansicht automatisch an Inhalt an
        >
          {/* Steuerelemente für Zoom und Ansicht */}
          <Controls
            position="top-right"
            showZoom={true} // Zeigt Zoom-Buttons
            showFitView={true} // Zeigt "Fit View"-Button
            showInteractive={false} // Versteckt Lock-Button
          />
          {/* MiniMap zur Übersicht */}
          <MiniMap
            position="top-left"
            nodeColor="#d0e0e4ff"
            pannable={true}
            zoomable={true}
            zoomStep={0.1}
             />
          {/* <Background /> // Hintergrundraster */}
        </ReactFlow>
      )}

      {/* Tooltip für Node-Beschreibungen */}
      <DiagramTooltip
        isOpen={tooltip.isOpen}
        content={tooltip.content}
        refs={tooltip.refs}
        floatingStyles={tooltip.floatingStyles}
        getFloatingProps={tooltip.getFloatingProps}
        arrowRef={tooltip.arrowRef}
        context={tooltip.context}
        isPositioned={tooltip.isPositioned}
      />
    </div>
  );
};

export default DiagramFlow;
