import { type ReactElement } from "react";
import { FormattedMessage } from "react-intl";
import type { BaseProperty } from "@/types";
import { useLocalizedName } from "@/hooks/Localization";
import { getTableColumns } from "@/configs/tableConfigs";
import { 
  hasYearField, 
  getColumnStyle, 
  renderPropertyCell 
} from "@/functions/tableFunctions";

/**
 * Property-Tabelle (Eigenschaftentabelle)
 * Zeigt Properties in Tabellenform an (dynamisch mit/ohne Jahr-Spalte)
 * @param properties - Array von BaseProperty-Objekten
 * @returns ReactElement - Die gerenderte Property-Tabelle
 */
export const PropertyTable = ({
  properties,
}: {
  properties: BaseProperty[];
}): ReactElement => {
  const getLocalizedName = useLocalizedName();
  const hasYear = hasYearField(properties);
  const columns = getTableColumns(hasYear);

  return (
    <table className="table is-striped is-narrow is-hoverable is-fullwidth">
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.key} style={getColumnStyle(col.key, hasYear)}>
              <FormattedMessage
                id={col.headerId}
                defaultMessage={col.headerDefault}
              />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {properties.map((prop: BaseProperty) => (
          <tr key={prop.id}>
            {columns.map((col) => (
              <td 
                key={`${prop.id}-${col.key}`}
                style={getColumnStyle(col.key, hasYear)}
              >
                {renderPropertyCell(prop, col.key, getLocalizedName)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
