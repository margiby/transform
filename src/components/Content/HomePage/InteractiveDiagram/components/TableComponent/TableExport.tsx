import { type ReactElement } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Download } from "lucide-react";
import type { TableExportProps } from "@/types";
import { exportPropertyToCSV } from "@/functions/tableFunctions/tableCSVExport";
import { useLocale } from "@/hooks/Context";

/**
 * TableExport-Komponente
 * Export-Button mit CSV-Export-Logik
 * @param properties - Array von BaseProperty-Objekten zum Exportieren
 * @param title - Titel der Tabelle für den Dateinamen
 * @returns ReactElement - Der gerenderte Export-Button
 */
export const TableExport = ({
  properties,
  title,
}: TableExportProps): ReactElement => {
  const intl = useIntl();
  const [{ activeLocale }] = useLocale();

  const handleExport = () => {
    if (properties.length === 0) {
      console.warn('Keine Daten zum Exportieren vorhanden');
      return;
    }

    exportPropertyToCSV(properties, title, intl, activeLocale);
  };

  return (
    <button
      type="button"
      className="button is-small is-primary"
      aria-label={intl.formatMessage({
        id: 'export_csv',
        defaultMessage: 'Als CSV exportieren'
      })}
      title={intl.formatMessage({
        id: 'export_csv',
        defaultMessage: 'Als CSV exportieren'
      })}
      onClick={handleExport}
    >
      <span className="icon is-small">
        <Download size={16} />
      </span>
      <span>
        <FormattedMessage 
          id="export_csv" 
          defaultMessage="Als CSV exportieren"
        />
      </span>
    </button>
  );
};
