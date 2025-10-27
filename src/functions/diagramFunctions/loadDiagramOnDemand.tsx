import { DIAGRAMS } from "@/configs";
import { fetchJson } from "../utilityFunctions";
import { createTreeDiagram } from "../factoryFunctions/diagramFactory";
import { initTreeConfig, tryRegisterDiagram } from "../registryFunctions/registryHelpers";
import type {
  TreeFactoryNodeConfig,
  DiagramKey,
  DiagramDataMap,
} from "@/types";

/**
 * Lädt ein Diagramm on-demand basierend auf der diagramId
 * 
 * Flow:
 * 1. Dynamic Import der Transform-Funktion
 * 2. Fetch JSON-Daten von der dataSource
 * 3. Transform Daten zu TreeFactoryNodeConfig
 * 4. Registriere Diagramm mit Factory-Options aus Config
 * 
 * @param diagramId - Die ID des zu ladenden Diagramms
 * @throws Error wenn diagramId unbekannt ist oder Laden fehlschlägt
 */

export async function loadDiagramOnDemand(diagramId: DiagramKey): Promise<void> {
  const startTime = performance.now();
  console.log(`[On-Demand] START Loading diagram: "${diagramId}"`);

  try {
    let treeConfig: TreeFactoryNodeConfig;
  
    switch (diagramId) {
      case "xducts": {
        const importStart = performance.now();
        const { transformXductsData } = await import("../transformFunctions/diagramTransformers/xdukte");
        console.log(`[On-Demand] Dynamic import took ${(performance.now() - importStart).toFixed(2)}ms`);
        
        const fetchStart = performance.now();
        const data = await fetchJson<DiagramDataMap["xducts"]>(DIAGRAMS.xducts.dataSource);
        console.log(`[On-Demand] Fetch took ${(performance.now() - fetchStart).toFixed(2)}ms`);
        
        const transformStart = performance.now();
        treeConfig = transformXductsData(data);
        console.log(`[On-Demand] Transform took ${(performance.now() - transformStart).toFixed(2)}ms`);
        
        const registerStart = performance.now();
        initTreeConfig("xducts", treeConfig);
        tryRegisterDiagram("xducts", () => {
          createTreeDiagram("xducts", treeConfig, DIAGRAMS.xducts.factoryOptions);
        });
        console.log(`[On-Demand] Register took ${(performance.now() - registerStart).toFixed(2)}ms`);
        break;
      }
      case "process_chains": {
        const { transformProcessChainsData } = await import("../transformFunctions/diagramTransformers/prozessketten");
        const data = await fetchJson<DiagramDataMap["process_chains"]>(DIAGRAMS.process_chains.dataSource);
        treeConfig = transformProcessChainsData(data);
        
        initTreeConfig("process_chains", treeConfig);
        tryRegisterDiagram("process_chains", () => {
          createTreeDiagram("process_chains", treeConfig, DIAGRAMS.process_chains.factoryOptions);
        });
        break;
      }
      case "supply_concepts": {
        const { transformSupplyConceptsData } = await import("../transformFunctions/diagramTransformers/versorgungskonzepte");
        const data = await fetchJson<DiagramDataMap["supply_concepts"]>(DIAGRAMS.supply_concepts.dataSource);
        treeConfig = transformSupplyConceptsData(data);
        
        initTreeConfig("supply_concepts", treeConfig);
        tryRegisterDiagram("supply_concepts", () => {
          createTreeDiagram("supply_concepts", treeConfig, DIAGRAMS.supply_concepts.factoryOptions);
        });
        break;
      }
      case "supply_tasks": {
        const { transformSupplyTasksData } = await import("../transformFunctions/diagramTransformers/versorgungsaufgaben");
        const data = await fetchJson<DiagramDataMap["supply_tasks"]>(DIAGRAMS.supply_tasks.dataSource);
        treeConfig = transformSupplyTasksData(data);
        
        initTreeConfig("supply_tasks", treeConfig);
        tryRegisterDiagram("supply_tasks", () => {
          createTreeDiagram("supply_tasks", treeConfig, DIAGRAMS.supply_tasks.factoryOptions);
        });
        break;
      }
      case "conversion_procedures": {
        const { transformConversionProceduresData } = await import("../transformFunctions/diagramTransformers/konversionsverfahren");
        const data = await fetchJson<DiagramDataMap["conversion_procedures"]>(DIAGRAMS.conversion_procedures.dataSource);
        treeConfig = transformConversionProceduresData(data);
        
        initTreeConfig("conversion_procedures", treeConfig);
        tryRegisterDiagram("conversion_procedures", () => {
          createTreeDiagram("conversion_procedures", treeConfig, DIAGRAMS.conversion_procedures.factoryOptions);
        });
        break;
      }
      default:
        throw new Error(`No transform function for diagram: "${diagramId}"`);
    }

    // Erfolgsmeldung
    const totalTime = (performance.now() - startTime).toFixed(2);
    console.log(`[On-Demand] Successfully loaded diagram: "${diagramId}" in ${totalTime}ms`);
  } catch (error) {
    console.error(`[On-Demand] Failed to load diagram "${diagramId}":`, error);
    throw error;
  }
}
