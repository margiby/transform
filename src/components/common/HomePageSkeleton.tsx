import type { ReactElement } from "react";
import "../../styles/skeleton.css";

/**
 * HomePageSkeleton Komponente
 * Zeigt ein Skeleton-Placeholder für die gesamte HomePage während sie lädt
 * @returns ReactElement - Die gerenderte Skeleton-Komponente
 */
const HomePageSkeleton = (): ReactElement => {
  return (
    <section className="section">
      <div className="container">
        {/* Titel Skeleton */}
        <div className="skeleton-page-title"></div>
        
        {/* Text Box Skeleton */}
        <div className="box skeleton-text-box">
          <div className="skeleton-text-line skeleton-text-line-1"></div>
          <div className="skeleton-text-line skeleton-text-line-2"></div>
          <div className="skeleton-text-line skeleton-text-line-3"></div>
          <div className="skeleton-text-line skeleton-text-line-4"></div>
          <div className="skeleton-text-line skeleton-text-line-short"></div>
          
          <div style={{ marginTop: '1.5rem' }}>
            <div className="skeleton-text-line skeleton-text-line-2"></div>
            <div className="skeleton-text-line skeleton-text-line-3"></div>
            <div className="skeleton-text-line skeleton-text-line-1"></div>
          </div>
        </div>
        
        {/* Diagramm Skeleton */}
        <div className="mt-5">
          <div className="box">
            {/* Diagramm Titel */}
            <div className="skeleton-title"></div>
            
            {/* Controls */}
            <div className="skeleton-controls">
              <div className="skeleton-button"></div>
              <div className="skeleton-button"></div>
              <div className="skeleton-button"></div>
            </div>
            
            {/* Diagramm Container */}
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePageSkeleton;
