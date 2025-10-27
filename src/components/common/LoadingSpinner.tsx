import type { ReactElement, ReactNode } from "react";

/**
 * LoadingSpinner Props
 */
type LoadingSpinnerProps = {
  /** Optionaler Text oder React-Element unter dem Spinner */
  message?: string | ReactNode;
  /** Zeige nur den Spinner ohne Text */
  spinnerOnly?: boolean;
}

/**
 * LoadingSpinner Komponente
 * Zeigt einen animierten Spinner mit optionaler Nachricht an
 * 
 * @param message - Text oder React-Element (z.B. FormattedMessage) unter dem Spinner
 * @param spinnerOnly - Wenn true, wird nur der Spinner ohne Text angezeigt
 * @returns ReactElement - Die gerenderte LoadingSpinner-Komponente
 */
const LoadingSpinner = ({ 
  message = "Lädt...", 
  spinnerOnly = false 
}: LoadingSpinnerProps): ReactElement => {
  return (
    <div className="loading-spinner-overlay">
      <div className="loading-spinner-container">
        <div className="loading-spinner"></div>
        {!spinnerOnly && (
          <p className="loading-spinner-text">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default LoadingSpinner;
