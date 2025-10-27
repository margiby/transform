import { type ReactElement, useRef } from "react";
import { useScrollSync } from "@/hooks/tableHooks";
import type { TableWrapperProps } from "@/types";

/**
 * TableWrapper-Komponente
 * Wrapper mit dualen synchronisierten Scrollbars (oben + unten)
 * Verwaltet Refs und Scroll-Synchronisation intern
 * @param children - Die Tabellenkomponente, die umschlossen wird
 * @returns ReactElement - Der gerenderte TableWrapper
 */
export const TableWrapper = ({
  children,
}: TableWrapperProps): ReactElement => {
  const topScrollRef = useRef<HTMLDivElement>(null);
  const bottomScrollRef = useRef<HTMLDivElement>(null);

  // Synchronisiert die Scrollbars miteinander
  useScrollSync(topScrollRef, bottomScrollRef, [children]);

  return (
    <div className="table-wrapper">
      {/* Obere Scrollbar */}
      <div className="table-scroll-top" ref={topScrollRef}>
        <div></div>
      </div>
      
      {/* Tabellen-Container */}
      <div className="table-container" ref={bottomScrollRef}>
        {children}
      </div>
    </div>
  );
};
