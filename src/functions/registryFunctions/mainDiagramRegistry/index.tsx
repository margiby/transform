import { tryRegisterDiagram } from "../registryHelpers";
import { createFlexibleDiagram } from "../../factoryFunctions/diagramFactory";
import { mainDiagramNodes, mainDiagramEdges } from "@/configs";
import type { FlexibleDiagramConfig, DiagramFactoryOptions } from "@/types";

/**
 * Registriert das Hauptdiagramm (root)
 * Wird in DiagramOrchestrator beim Mount aufgerufen
 */
export function registerMainDiagram(): void {
  // tryRegisterDiagram verhindert Re-Registration automatisch
  tryRegisterDiagram("root", () => {
    console.log("AKTION: Registriere Main Diagram (root)...");

    const config: FlexibleDiagramConfig = {
      nodes: mainDiagramNodes,
      edges: mainDiagramEdges,
    };

    const options: DiagramFactoryOptions = {
      defaultNodeType: 'custom',
      defaultEdgeType: 'floating',
    };

    createFlexibleDiagram("root", config, options);
  });
}
