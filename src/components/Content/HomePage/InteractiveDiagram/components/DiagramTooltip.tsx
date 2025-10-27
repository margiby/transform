import type { ReactElement } from "react";
import { FloatingPortal, FloatingArrow } from "@floating-ui/react";
import type { DiagramTooltipProps } from "@/types";

/**
 * Tooltip-Komponente für Diagramm-Knoten
 * Verwendet Floating UI für intelligentes Positioning
 * 
 * @param isOpen - Gibt an, ob der Tooltip sichtbar sein soll
 * @param content - Der anzuzeigende Inhalt des Tooltips (HTML-String)
 * @param refs - Floating UI Refs-Objekt für Positionierung
 * @param floatingStyles - Floating UI Styles für Positionierung
 * @param getFloatingProps - Floating UI Props-Getter für Accessibility
 * @param arrowRef - Ref für den Tooltip-Pfeil
 * @param context - Floating UI Kontext für den Pfeil
 * @param isPositioned - Gibt an, ob der Tooltip bereits positioniert wurde
 * @returns ReactElement | null - Der gerenderte Tooltip oder null, wenn nicht sichtbar
 */

const DiagramTooltip = ({
  isOpen,
  content,
  refs,
  floatingStyles,
  getFloatingProps,
  arrowRef,
  context,
  isPositioned,
}: DiagramTooltipProps): ReactElement | null => {
  if (!isOpen || !content.trim()) {
    return null;
  }

  return (
    <FloatingPortal>
      <div
        ref={refs.setFloating}
        style={floatingStyles}
        className={`diagram-tooltip ${isPositioned ? 'is-positioned' : ''}`}
        {...getFloatingProps()}
      >
        <FloatingArrow ref={arrowRef} context={context} className="diagram-tooltip-arrow" />
        {content}
      </div>
    </FloatingPortal>
  );
};

export default DiagramTooltip;
