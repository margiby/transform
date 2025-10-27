import type { ReactElement } from "react";
import { FormattedMessage } from "react-intl";
import "../../styles/skeleton.css";

/**
 * DiagramSkeleton Komponente
 * Zeigt ein Skeleton-Placeholder während das Diagramm lädt
 * @returns ReactElement - Die gerenderte Skeleton-Komponente
 */
const DiagramSkeleton = (): ReactElement => {
  return (
    <div className="box">
      {/* Titel Skeleton */}
      <div className="skeleton-title"></div>
      
      {/* Controls Skeleton */}
      <div className="skeleton-controls">
        <div className="skeleton-button"></div>
        <div className="skeleton-button"></div>
        <div className="skeleton-button"></div>
      </div>
      
      {/* Diagramm Container Skeleton */}
      <div className="skeleton-diagram">
        <div className="skeleton-diagram-content">
          {/* Simulierte Nodes */}
          <div className="skeleton-node" style={{ top: '20%', left: '50%' }}></div>
          <div className="skeleton-node" style={{ top: '50%', left: '25%' }}></div>
          <div className="skeleton-node" style={{ top: '50%', left: '50%' }}></div>
          <div className="skeleton-node" style={{ top: '50%', left: '75%' }}></div>
          <div className="skeleton-node" style={{ top: '80%', left: '33%' }}></div>
          <div className="skeleton-node" style={{ top: '80%', left: '66%' }}></div>
        </div>
        
        {/* Loading Indicator */}
        <div className="skeleton-loading-overlay">
          <div className="skeleton-spinner"></div>
          <p className="skeleton-loading-text">
            <FormattedMessage
              id="diagram_loading_component"
              defaultMessage="Lade Diagramm..."
            />
          </p>
        </div>
      </div>
    </div>
  );
};

export default DiagramSkeleton;
