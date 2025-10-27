import type { ReactElement } from "react";
import { lazy, Suspense } from "react";
import { useDiagramLayout, useDiagramStore, useTooltip } from "../../../../hooks/diagrammHooks";
import { default as diagramNodeClickHandler } from "@/functions/diagramFunctions/diagramNodeClickHandler";
import { scrollToSelector } from "@/functions/utilityFunctions";
import DiagramTitle from "./components/DiagramTitle";
import DiagramControls from "./components/DiagramControls";
import DiagramFlow from "./DiagramFlow";
import { DataLoadingSkeleton } from "@/components/common";

// Lazy load table component
const TableComponent = lazy(() => import("./components/TableComponent"));

/**
 * Die Hauptansichtskomponente für das interaktive Diagramm.
 * Koordiniert alle Subkomponenten: Titel, Controls, Flow und Tabelle.
 * @return ReactElement - Die gerenderte Diagramm-Container-Komponente
 */
const DiagramContainer = (): ReactElement => {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    isLoadingLayout,
    hasLayouted,
    flowContainerRef,
    collapseNode,
    handleToggleAll,
  } = useDiagramLayout();

  const {
    diagramId,
    setDiagramId,
    tableData,
    setTableData,
    isLoadingSubdiagram,
  } = useDiagramStore();
  const tooltip = useTooltip();

  const handleNodeClick = diagramNodeClickHandler(collapseNode);

  const handleBack = () => {
    setDiagramId("root");
    setTableData(null);
  };

  const handleCloseTable = () => {
    scrollToSelector(".diagram-container-wrapper", { headerOffset: 80 });
    setTableData(null);
  };

  // Zeige Loader während Subdiagramm geladen wird
  if (isLoadingSubdiagram) {
    return <DataLoadingSkeleton />;
  }

  return (
    <div className="box diagram-container-wrapper">
      <DiagramTitle diagramId={diagramId} />

      <DiagramControls
        isSubdiagram={diagramId !== "root"}
        onExpandAll={() => handleToggleAll(false)}
        onCollapseAll={() => handleToggleAll(true)}
        onBack={handleBack}
      />

      <div className="diagram-layout-container">
        <DiagramFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={handleNodeClick}
          onNodeMouseEnter={tooltip.handleNodeMouseEnter}
          onNodeMouseLeave={tooltip.handleNodeMouseLeave}
          hasLayouted={hasLayouted}
          isLoadingLayout={isLoadingLayout}
          flowContainerRef={flowContainerRef}
          tooltip={tooltip}
        />

        {tableData && (
          <Suspense fallback={<div>Loading table...</div>}>
            <TableComponent data={tableData} onClose={handleCloseTable} />
          </Suspense>
        )}
      </div>
    </div>
  );
};

export default DiagramContainer;
