import { memo } from 'react';
import type { ReactElement } from 'react';
import { CircleArrowRight, CircleChevronLeft, Table } from 'lucide-react';
import type { NodeControlsProps } from '@/types';

/**
 * Kontroll-Icons für Knoten: Expand/Collapse und Tabellen-Ansicht
 */
const NodeControls = memo(({ 
  hasChildren, 
  isExpanded, 
  showTableIcon
}: NodeControlsProps): ReactElement | null => {
  
  // Keine Kontrollen ohne Funktionen
  if (!hasChildren && !showTableIcon) {
    return null;
  }

  return (
    <div className="node-controls">
      {hasChildren && (
        isExpanded ? 
          <CircleChevronLeft  /> : 
          <CircleArrowRight />
      )}
      {showTableIcon && <Table />}
    </div>
  );
});

export default NodeControls;