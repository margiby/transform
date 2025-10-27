import { ReactElement, useEffect, useState } from "react";
import DiagramContainer from "./DiagramContainer";
import { FormattedMessage } from "react-intl";
import { registerMainDiagram } from "@/functions/registryFunctions/mainDiagramRegistry";
import { LoadingSpinner } from "@/components/common";

console.log("[Module Load] DiagramOrchestrator loaded");

/**
 * Orchestrator für die Diagramm-Anzeige
 *
 * Diese Komponente:
 * - Registriert das Hauptdiagramm beim Mount
 * - Rendert den DiagramContainer
 *
 * Subdiagramme werden on-demand geladen beim Klick auf einen Node.
 */

const DiagramOrchestrator = (): ReactElement => {
  const [isMainDiagramReady, setIsMainDiagramReady] = useState(false);

  // Registriere nur das Hauptdiagramm beim Mount
  useEffect(() => {
    console.log("[Effect] Registering main diagram...");
    registerMainDiagram();
    setIsMainDiagramReady(true);
  }, []);

  // Warte bis Hauptdiagramm registriert ist
  if (!isMainDiagramReady) {
    return (
      <div className="box">
        <LoadingSpinner 
          message={
            <FormattedMessage
              id="diagram_initializing"
              defaultMessage="Diagramm wird initialisiert..."
            />
          }
        />
      </div>
    );
  }

  return <DiagramContainer />;
};

export default DiagramOrchestrator;
