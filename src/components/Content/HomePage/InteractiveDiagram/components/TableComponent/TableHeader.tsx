import { type ReactElement } from "react";
import { FormattedMessage } from "react-intl";
import type { TableHeaderProps } from "@/types";
import { TableExport } from "./TableExport";

/**
 * TableHeader-Komponente
 * @param displayTitle - Der anzuzeigende Titel der Tabelle
 * @param properties - Array von BaseProperty-Objekten
 * @param title - Titel der Tabelle für Exportzwecke
 * @param onClose - Callback-Funktion zum Schließen der Tabelle
 * @returns ReactElement - Der gerenderte Tabellen-Header
 */
export const TableHeader = ({
  displayTitle,
  properties,
  title,
  onClose,
}: TableHeaderProps): ReactElement => {
  return (
    <div className="level table-header">
      <div className="level-left">
        <h4 className="title is-4">
          <FormattedMessage 
            id="detailed_properties" 
            defaultMessage="Eigenschaften für: " 
          />
          {' '}
          {displayTitle}
        </h4>
      </div>
      <div className="level-right">
        <div className="buttons">
          <TableExport properties={properties} title={title} />
          <button
            type="button"
            className="delete is-large"
            aria-label="Schließen"
            onClick={onClose}
          />
        </div>
      </div>
    </div>
  );
};
