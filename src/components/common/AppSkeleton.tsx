import type { ReactElement } from "react";
import "../../styles/skeleton.css";

/**
 * AppSkeleton Komponente
 * Zeigt ein Skeleton für die initiale App-Ladung (Header + Content + Footer)
 * @returns ReactElement - Die gerenderte App-Skeleton-Komponente
 */
const AppSkeleton = (): ReactElement => {
  return (
    <div className="app-wrapper">
      {/* Header Skeleton */}
      <header className="skeleton-header">
        <div className="container">
          <div className="skeleton-header-content">
            {/* Logo/Brand */}
            <div className="skeleton-header-logo"></div>
            
            {/* Navigation */}
            <div className="skeleton-header-nav">
              <div className="skeleton-nav-item"></div>
              <div className="skeleton-nav-item"></div>
              <div className="skeleton-nav-item"></div>
            </div>
            
            {/* Language Selector */}
            <div className="skeleton-language-selector"></div>
          </div>
        </div>
      </header>

      {/* Main Content Skeleton */}
      <main className="main-content-area">
        <section className="section">
          <div className="container">
            {/* Page Title */}
            <div className="skeleton-page-title"></div>
            
            {/* Text Box */}
            <div className="box skeleton-text-box">
              <div className="skeleton-text-line skeleton-text-line-1"></div>
              <div className="skeleton-text-line skeleton-text-line-2"></div>
              <div className="skeleton-text-line skeleton-text-line-3"></div>
              <div className="skeleton-text-line skeleton-text-line-short"></div>
            </div>
            
            {/* Diagram Skeleton */}
            <div className="mt-5">
              <div className="box">
                <div className="skeleton-title"></div>
                <div className="skeleton-controls">
                  <div className="skeleton-button"></div>
                  <div className="skeleton-button"></div>
                  <div className="skeleton-button"></div>
                </div>
                <div className="skeleton-diagram">
                  <div className="skeleton-diagram-content">
                    <div className="skeleton-node" style={{ top: '20%', left: '50%' }}></div>
                    <div className="skeleton-node" style={{ top: '50%', left: '25%' }}></div>
                    <div className="skeleton-node" style={{ top: '50%', left: '50%' }}></div>
                    <div className="skeleton-node" style={{ top: '50%', left: '75%' }}></div>
                    <div className="skeleton-node" style={{ top: '80%', left: '33%' }}></div>
                    <div className="skeleton-node" style={{ top: '80%', left: '66%' }}></div>
                  </div>
                  
                  {/* Loading Overlay */}
                  <div className="skeleton-loading-overlay">
                    <div className="skeleton-spinner"></div>
                    <p className="skeleton-loading-text">Loading Bio Energy Technology Database...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Skeleton */}
      <footer className="skeleton-footer">
        <div className="container">
          <div className="skeleton-footer-content">
            <div className="skeleton-footer-text"></div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AppSkeleton;
