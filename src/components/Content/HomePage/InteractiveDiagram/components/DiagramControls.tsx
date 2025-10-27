import type { ReactElement } from "react";
import { FormattedMessage } from "react-intl";
import { ChevronsDown, ChevronsUp, ArrowLeftToLine } from "lucide-react";
import type { DiagramControlsProps } from "@/types";

/**
 * Steuerungs-Buttons für das Diagramm:
 * - Expand/Collapse Buttons (nur für Subdiagramme)
 * - Zurück-Button zur Hauptübersicht
 * 
 * Die Sichtbarkeit der Buttons wird dynamisch basierend auf dem 
 * aktuellen Diagrammtyp gesteuert.
 * @param isSubdiagram - Gibt an, ob das aktuelle Diagramm ein Subdiagramm ist (false = Root-Diagramm)
 * @param onExpandAll - Callback-Funktion zum Aufklappen aller Knoten
 * @param onCollapseAll - Callback-Funktion zum Zuklappen aller Knoten
 * @param onBack - Callback-Funktion zum Zurückkehren zur Hauptübersicht
 * @returns ReactElement | null - Die gerenderten Steuerungs-Buttons oder null, wenn keine angezeigt werden sollen
 */
const DiagramControls = ({
  isSubdiagram,
  onExpandAll,
  onCollapseAll,
  onBack,
}: DiagramControlsProps): ReactElement | null => {
  // Keine Controls anzeigen im Root-Diagramm
  if (!isSubdiagram) {
    return null;
  }

  return (
    <div className="has-text-right mb-2">
      <div className="field has-addons diagram-buttons-responsive">
        {/* Expand/Collapse Buttons - nur für Subdiagramme */}
        {isSubdiagram && (
          <>
            {/* Button: Alle Knoten aufklappen */}
            <button
              type="button"
              aria-label="Alles aufklappen"
              className="button is-light"
              onClick={onExpandAll}
            >
              <span className="icon-text">
                <span className="icon">
                  <ChevronsDown className="diagram-icon-expand" />
                </span>
                <span>
                  <FormattedMessage
                    id="diagram_expand_all"
                    defaultMessage="Alles aufklappen"
                  />
                </span>
              </span>
            </button>

            {/* Button: Alle Knoten zuklappen */}
            <button
              type="button"
              aria-label="Alles zuklappen"
              className="button is-light"
              onClick={onCollapseAll}
            >
              <span className="icon-text">
                <span className="icon">
                  <ChevronsUp className="diagram-icon-collapse" />
                </span>
                <span>
                  <FormattedMessage
                    id="diagram_collapse_all"
                    defaultMessage="Alles zuklappen"
                  />
                </span>
              </span>
            </button>
          </>
        )}
        
        {/* Zurück-Button - immer in Tree-Diagrammen anzeigen */}
        <button
          type="button"
          aria-label="Zurück zur Übersicht"
          className="button is-light"
          onClick={onBack}
        >
          <span className="icon-text">
            <span className="icon">
              <ArrowLeftToLine className="diagram-icon-back" />
            </span>
            <span>
              <FormattedMessage
                id="diagram_back_button"
                defaultMessage="Zurück zur Übersicht"
              />
            </span>
          </span>
        </button>
      </div>
    </div>
  );
};

export default DiagramControls;
