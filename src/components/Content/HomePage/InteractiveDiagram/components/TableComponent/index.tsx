import { type ReactElement } from "react";
import type { TableComponentProps } from "@/types";
import { useAutoScroll, useTableMetadata } from "@/hooks/tableHooks";
import { TableHeader } from "./TableHeader";
import { TableWrapper } from "./TableWrapper";
import { PropertyTable } from "./PropertyTable";
import "@/styles/table.css";

console.log("[Module Load] 📊 TableComponent/index.tsx loaded");

/**
 * Hauptkomponente für Tabellendarstellung
 * @param data - Die Daten, die in der Tabelle angezeigt werden sollen
 * @param onClose - Callback-Funktion zum Schließen der Tabelle
 * @returns ReactElement - Die gerenderte Tabellendarstellung
 */
const TableComponent = ({
  data,
  onClose,
}: TableComponentProps): ReactElement => {
  const { title, displayTitle, properties } = useTableMetadata(data);

  // Auto-Scroll zur Tabelle bei Öffnung
  useAutoScroll('#properties-table', [data]);

  return (
    <div className="box" id="properties-table">
      {/* Header-Bereich */}
      <TableHeader 
        displayTitle={displayTitle}
        properties={properties}
        title={title}
        onClose={onClose}
      />

      {/* Tabelle mit dualen Scrollbars */}
      <TableWrapper>
        <PropertyTable properties={properties} />
      </TableWrapper>
    </div>
  );
};

export default TableComponent;
