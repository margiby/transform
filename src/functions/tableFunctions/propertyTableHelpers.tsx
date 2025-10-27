import { type CSSProperties } from "react";
import { FormattedMessage } from "react-intl";
import type { BaseProperty, ColumnKey, LocalizedName } from "@/types";
import { 
  TABLE_COLUMNS_WITH_YEAR,
  TABLE_COLUMNS_WITHOUT_YEAR 
} from "@/configs/tableDimensions";

/**
 * Gibt die Style-Objekt für eine Tabellenspalte zurück
 * @param columnKey - Der Schlüssel der Spalte
 * @param hasYear - Ob die Tabelle eine Jahr-Spalte hat
 * @returns CSSProperties - Style-Objekt mit width und minWidth
 */
export const getColumnStyle = (columnKey: ColumnKey, hasYear: boolean): CSSProperties => {
  const dimensions = hasYear 
    ? TABLE_COLUMNS_WITH_YEAR 
    : TABLE_COLUMNS_WITHOUT_YEAR;
  
  const dim = dimensions[columnKey];
  return dim ? {
    width: dim.width,
    minWidth: dim.minWidth,
  } : {};
};

/**
 * Rendert den Inhalt einer Tabellenzelle basierend auf dem Spaltentyp
 * @param prop - Die Property-Daten
 * @param columnKey - Der Schlüssel der Spalte
 * @param getLocalizedName - Funktion zum Abrufen lokalisierter Namen
 * @returns React Element - Der Zelleninhalt
 */
export const renderPropertyCell = (
  prop: BaseProperty, 
  columnKey: ColumnKey,
  getLocalizedName: (obj: LocalizedName) => string
) => {
  switch (columnKey) {
    case "property":
      return getLocalizedName(prop.property);
      
    case "value":
      return prop.value !== null ? (
        prop.value.toLocaleString()
      ) : (
        <span className="has-text-grey is-italic">
          <FormattedMessage id="not_available" defaultMessage="n/a" />
        </span>
      );
      
    case "unit":
      // Bevorzuge symbol-Feld, fallback auf lokalisierte Namen
      const symbol = prop.unit.symbol;
      const localizedUnit = getLocalizedName(prop.unit);
      // Zeige "K/A"/"n/a" wenn beides leer ist
      return (symbol && symbol.trim()) || (localizedUnit && localizedUnit.trim()) || (
        <span className="has-text-grey is-italic">
          <FormattedMessage id="not_available" defaultMessage="n/a" />
        </span>
      );
      
    case "year":
      return prop.year !== null && prop.year !== undefined ? (
        prop.year
      ) : (
        <span className="has-text-grey is-italic">
          <FormattedMessage id="not_available" defaultMessage="n/a" />
        </span>
      );
      
    case "source":
      return prop.reference.source ? (
        <span className="has-text-grey-dark" title={prop.reference.source}>
          {prop.reference.source}
        </span>
      ) : (
        <span className="has-text-grey is-italic">
          <FormattedMessage id="no_source" defaultMessage="Keine Quelle" />
        </span>
      );
      
    default:
      return null;
  }
};
