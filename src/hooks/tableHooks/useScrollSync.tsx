import { useEffect, type RefObject } from "react";

/**
 * Hook zur Synchronisierung von zwei Scrollbars
 * Verwendet für die duale Scrollbar-Funktionalität in der TableComponent
 * 
 * @param topScrollRef - Ref für die obere Scrollbar
 * @param bottomScrollRef - Ref für die untere Scrollbar (mit Tabelle)
 * @param dependencies - Array von Abhängigkeiten für den useEffect
 */
export const useScrollSync = (
  topScrollRef: RefObject<HTMLDivElement | null>,
  bottomScrollRef: RefObject<HTMLDivElement | null>,
  dependencies: unknown[] = []
) => {
  useEffect(() => {
    const topScroll = topScrollRef.current;
    const bottomScroll = bottomScrollRef.current;
    
    if (!topScroll || !bottomScroll) return;

    // Die Breite der oberen Scrollbar gleich der Tabellenbreite setzen
    const table = bottomScroll.querySelector('table');
    if (table) {
      const scrollDiv = topScroll.querySelector('div');
      if (scrollDiv) {
        scrollDiv.style.width = `${table.scrollWidth}px`;
      }
    }

    // Synchronisiert Scrolling zwischen zwei Elementen
    const syncScroll = (source: HTMLDivElement, target: HTMLDivElement) => {
      target.scrollLeft = source.scrollLeft;
    };

    const handleTopScroll = () => syncScroll(topScroll, bottomScroll);
    const handleBottomScroll = () => syncScroll(bottomScroll, topScroll);

    topScroll.addEventListener('scroll', handleTopScroll);
    bottomScroll.addEventListener('scroll', handleBottomScroll);

    return () => {
      topScroll.removeEventListener('scroll', handleTopScroll);
      bottomScroll.removeEventListener('scroll', handleBottomScroll);
    };
  }, dependencies);
};
