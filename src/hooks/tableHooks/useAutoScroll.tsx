import { useEffect } from "react";
import { scrollToSelector } from "@/functions/utilityFunctions";

/**
 * Hook für automatisches Scrollen zu einem Element
 * Scrollt zur Tabelle, wenn sie geöffnet wird
 * 
 * @param selector - CSS-Selektor des Zielelements
 * @param dependencies - Array von Abhängigkeiten
 * @param options - Scroll-Optionen (headerOffset, timeout)
 */
export const useAutoScroll = (
  selector: string,
  dependencies: unknown[] = [],
  options: { headerOffset?: number; timeout?: number } = {}
) => {
  useEffect(() => {
    scrollToSelector(selector, {
      headerOffset: options.headerOffset ?? 100,
      timeout: options.timeout ?? 100,
    });
  }, dependencies);
};
