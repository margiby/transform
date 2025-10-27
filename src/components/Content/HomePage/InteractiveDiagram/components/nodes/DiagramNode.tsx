import { memo } from 'react';
import type { ReactElement } from 'react';
import { Handle, Position } from '@xyflow/react';
import type { CustomNodeProps } from '@/types';
import NodeControls from './NodeControls';
import { useNodeLabel } from '../../../../../../hooks/Localization/useNodeLabel';

/**
 * Diagramm-Knoten Komponente mit optionalem Icon und Kontroll-Elementen
 * Unterstützt String, LocalizedName und ReactNode als Label
 */
const DiagramNode = memo(({ data, targetPosition, sourcePosition }: CustomNodeProps): ReactElement => {
  const getLabel = useNodeLabel();
  
  // Handle-Positionen: Standard oder benutzerdefiniert
  const targetPos = targetPosition || Position.Bottom;
  const sourcePos = sourcePosition || Position.Top;

  // Extrahiere Zustandswerte für Kontroll-Elemente
  const hasChildren = data.hasChildren || false;
  const isExpanded = data.isExpanded || false;
  const showTableIcon = data.showTableIcon || false;

  return (
    <>
      <Handle 
        type="target"
        position={targetPos}
        className="custom-handle"
      />
      <div className="custom-node-content">
        <div className="node-main">
          {data.icon ? data.icon : null}
          <span>{getLabel(data.label)}</span>
        </div>
        <NodeControls 
          hasChildren={hasChildren}
          isExpanded={isExpanded}
          showTableIcon={showTableIcon}
        />
      </div>
      <Handle 
        type="source"
        position={sourcePos}
        className="custom-handle"
      />
    </>
  );
});

export default DiagramNode;