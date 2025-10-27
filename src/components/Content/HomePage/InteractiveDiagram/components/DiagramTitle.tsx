import type { ReactElement } from "react";
import { FormattedMessage } from "react-intl";
import type { DiagramTitleProps } from "@/types";

/**
 * Titel des aktuellen Diagramms
 * 
 * Zeigt den lokalisierten Namen des aktiven Diagramms an.
 * Für das Root-Diagramm wird "diagram_root_name" verwendet,
 * für alle anderen wird der DiagramId-basierte Message-Key verwendet.
 */
const DiagramTitle = ({ diagramId }: DiagramTitleProps): ReactElement => {
  return (
    <p className="title is-5 has-text-centered">
      {/* Root-Diagramm oder spezifisches Diagramm */}
      {diagramId === "root" ? (
        <FormattedMessage id="diagram_root_name" />
      ) : (
        <FormattedMessage id={`${diagramId}_label`} />
      )}
    </p>
  );
};

export default DiagramTitle;
