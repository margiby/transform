import { useState, useRef, useEffect, useCallback } from "react";
import { useIntl } from "react-intl";
import type { NodeMouseHandler } from "@xyflow/react";
import type { UseTooltipReturn } from "@/types";
import type { ReferenceType } from "@floating-ui/react";
import { isLocalizedMessage, isLocalizedName } from "@/types";
import { getLocalizedName } from "@/hooks/Localization/localizationHelpers";
import useDiagramStore from "./useDiagramStore";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  arrow,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
} from "@floating-ui/react";

/**
 * Custom Hook für Tooltip-Funktionalität in Diagrammen
 * Verwendet Floating UI für intelligentes Positioning
 * Folgt dem offiziellen Floating UI Tutorial Pattern
 * https://floating-ui.com/docs/tutorial
 */
export const useTooltip = (): UseTooltipReturn => {
  const intl = useIntl();
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState("");
  const arrowRef = useRef<SVGSVGElement | null>(null);
  const { diagramId } = useDiagramStore();

  // Tooltip schließen wenn das Diagramm wechselt
  useEffect(() => {
    setIsOpen(false);
    setContent("");
  }, [diagramId]);

  const { refs, floatingStyles, context, middlewareData, placement, isPositioned } = useFloating<ReferenceType>({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: "right",
    middleware: [
      offset(10),
      flip(),
      shift({ padding: 8 }),
      arrow({ element: arrowRef }),
    ],
    whileElementsMounted: autoUpdate,
  });

  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "tooltip" });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    focus,
    dismiss,
    role,
  ]);

  // Hilfsfunktion zur Formatierung des Inhalts aus der Node-Beschreibung
  const formatContent = useCallback((description: unknown): string => {
    if (typeof description === "string") {
      return description;
    } else if (isLocalizedMessage(description)) {
      const processedValues: Record<string, string | number> = {};

      if ("entities" in description && description.entities) {
        for (const [key, entity] of Object.entries(description.entities)) {
          processedValues[key] = getLocalizedName(entity, intl.locale, false);
        }
      }

      if (description.values) {
        for (const [key, value] of Object.entries(description.values)) {
          if (isLocalizedName(value)) {
            processedValues[key] = getLocalizedName(value, intl.locale, false);
          } else if (typeof value === "string" || typeof value === "number") {
            processedValues[key] = value;
          }
        }
      }

      try {
        return intl.formatMessage(
          { id: description.messageId },
          processedValues
        );
      } catch (error) {
        console.error(`[useTooltip] Error formatting message '${description.messageId}':`, error, processedValues);
        return "";
      }
    }
    return "";
  }, [intl]);

  // Handler für Node Mouse Enter - setzt Referenz und Inhalt
  const handleNodeMouseEnter: NodeMouseHandler = useCallback((event, node) => {
    const description = node.data?.description;
    const formattedContent = formatContent(description);

    if (formattedContent.trim()) {
      setContent(formattedContent);
      refs.setReference(event.currentTarget as HTMLElement);
      setIsOpen(true);
    }
  }, [formatContent, refs.setReference]);

  // Handler für Node Mouse Leave - schließt den Tooltip
  const handleNodeMouseLeave: NodeMouseHandler = useCallback(() => {
    setIsOpen(false);
    setContent("");
  }, []);

  // Rückgabe des Hook-Ergebnisses
  const result: UseTooltipReturn = {
    isOpen,
    content,
    refs,
    floatingStyles,
    context,
    getReferenceProps,
    getFloatingProps,
    handleNodeMouseEnter,
    handleNodeMouseLeave,
    arrowRef,
    middlewareData,
    placement,
    isPositioned,
  };

  return result;
};