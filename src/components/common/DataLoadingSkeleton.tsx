import type { ReactElement } from "react";
import { FormattedMessage } from "react-intl";
import "../../styles/skeleton.css";

/**
 * DataLoadingSkeleton Komponente
 * Zeigt ein Skeleton mit Progress Bar während Diagramm-Daten geladen werden
 * @returns ReactElement - Die gerenderte Skeleton-Komponente
 */
const DataLoadingSkeleton = (): ReactElement => {
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
      
      {/* Diagramm Container mit Progress */}
      <div className="skeleton-diagram">
        <div className="skeleton-diagram-content">
          {/* Simulierte Nodes */}
          <div className="skeleton-node skeleton-node-faded" style={{ top: '20%', left: '50%' }}></div>
          <div className="skeleton-node skeleton-node-faded" style={{ top: '50%', left: '25%' }}></div>
          <div className="skeleton-node skeleton-node-faded" style={{ top: '50%', left: '50%' }}></div>
          <div className="skeleton-node skeleton-node-faded" style={{ top: '50%', left: '75%' }}></div>
          <div className="skeleton-node skeleton-node-faded" style={{ top: '80%', left: '33%' }}></div>
          <div className="skeleton-node skeleton-node-faded" style={{ top: '80%', left: '66%' }}></div>
        </div>
        
        {/* Loading Indicator mit Progress Bar */}
        <div className="skeleton-loading-overlay">
          <div className="skeleton-spinner"></div>
          <p className="skeleton-loading-text">
            <FormattedMessage
              id="diagram_loading_data"
              defaultMessage="Lade Daten..."
            />
          </p>
          
          {/* Progress Bar */}
          <div className="data-loading-progress-container">
            <div className="data-loading-progress-bar">
              <div className="data-loading-progress-fill"></div>
            </div>
            <p className="data-loading-progress-text">
              <FormattedMessage
                id="diagram_loading_data_steps"
                defaultMessage="Daten werden verarbeitet..."
              />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataLoadingSkeleton;
