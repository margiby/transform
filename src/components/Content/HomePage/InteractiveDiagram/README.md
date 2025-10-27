# Interaktives Diagramm

Dieses Verzeichnis enthält die Umsetzung des interaktiven Diagramms auf Basis von **ReactFlow**. Die nachfolgenden Abschnitte geben einen Überblick über Aufbau und Funktionsweise.

## Einstieg

Die Komponente `index.tsx` stellt den Einstiegspunkt dar. Hier wird der `ReactFlowProvider` eingebunden, der sämtliche ReactFlow-Komponenten mit Kontext versorgt. Anschließend übernimmt `DiagramOrchestrator` die Initialisierung aller Diagramme.

```tsx
import { ReactFlowProvider } from "@xyflow/react";

const InteractiveDiagram = () => (
  <ReactFlowProvider>
    <DiagramOrchestrator />
  </ReactFlowProvider>
);
```

## DiagramOrchestrator

`DiagramOrchestrator.tsx` registriert beim ersten Rendern das Hauptdiagramm. Sobald die Registrierung abgeschlossen ist, rendert er `DiagramContainer`, welches das eigentliche Diagramm anzeigt.

```tsx
useEffect(() => {
  registerMainDiagram();     // Hauptdiagramm
  setIsMainDiagramReady(true);
}, []);
```

Subdiagramme werden on-demand geladen, wenn auf einen Node geklickt wird. Während der Registrierung wird ein Ladehinweis angezeigt.

## DiagramContainer und Hooks

`DiagramContainer.tsx` nutzt den Hook `useDiagramLayout`, um Knoten, Kanten und deren Positionen zu verwalten. Dieser Hook kümmert sich um folgende Aufgaben:

- Laden des aktuellen Diagramms aus der Registry
- Berechnen der Layout-Positionen mit **ELK.js** (`getLayoutedElements`)
- Beobachten von Größenänderungen des Containers (ResizeObserver)
- Bereitstellen der ReactFlow-Handler `onNodesChange` und `onEdgesChange`

Der so gelieferte Zustand wird an die `ReactFlow`-Komponente übergeben. Zusätzlich kümmert sich der Hook `useDiagramStore` (zustand) darum, welche Diagramm-ID aktuell angezeigt wird. Über die `handleNodeClick`-Funktion kann in ein Subdiagramm gewechselt werden.

## Registry und Factories

Die Funktionen zur Diagramm-Verwaltung befinden sich unter `src/functions/`:

- **registryFunctions/** – Zentrale Registry-Verwaltung
  - **registryStore.tsx** – Speichert alle Diagramme (`diagramRegistry`)
  - **registryHelpers.tsx** – Hilfsfunktionen wie `registerDiagram` und `tryRegisterDiagram` (Schutzmechanismus gegen doppelte Registrierung)
  - **mainDiagramRegistry/** – Registrierung des Hauptdiagramms
- **factoryFunctions/diagramFactory.tsx** – Erstellt Diagramme aus Konfigurationen (`createFlexibleDiagram`, `createTreeDiagram`)
- **diagramFunctions/elkLayout-utils.tsx** – Berechnet mit ELK.js die Positionen der Knoten

## Daten und Layout

Die Konfigurationen befinden sich unter `src/configs/`:

- **mainDiagram/** – Knoten und Kanten des Hauptdiagramms
- **elkLayoutOptions.tsx** – ELK-Layout-Optionen
- **nodeDimensions.tsx** – Knotengrößen und Dimensionen
- **diagramConfigs.tsx** – Allgemeine Diagramm-Konfigurationen

Typdefinitionen liegen unter `src/types/` (diagram.ts, transform.ts).

## Ablauf beim Laden

1. `InteractiveDiagram` rendert den `DiagramOrchestrator`.
2. Dieser registriert über `registerMainDiagram` das Hauptdiagramm in der Registry.
3. Danach rendert `DiagramContainer`, welches mithilfe von `useDiagramLayout` das Hauptdiagramm aus der Registry lädt und das Layout mit ELK.js berechnet.
4. Die fertigen Knoten und Kanten werden an `ReactFlow` übergeben. Über `handleNodeClick` werden Subdiagramme on-demand geladen und angezeigt.

Diese Struktur trennt Logik (Hooks und Functions) von Daten (Konfigurationen) und Darstellung (React-Komponenten und CSS). Dadurch lässt sich das Diagramm leicht erweitern, ohne die Kernlogik anzupassen.

## Dateistruktur im Detail

```bash
InteractiveDiagram/
├─ index.tsx               # Einstieg, setzt ReactFlowProvider
├─ DiagramOrchestrator.tsx # Registriert Hauptdiagramm und zeigt DiagramContainer
├─ DiagramContainer.tsx    # Hauptansicht mit ReactFlow
├─ DiagramFlow.tsx         # ReactFlow Wrapper-Komponente
├─ README.md
│
└─ components/             # React-Komponenten
   ├─ nodes/               # Node-Komponenten (DiagramNode, NodeControls)
   ├─ edges/               # Edge-Komponenten (FloatingEdge)
   ├─ TableComponent/      # Tabellen-Komponenten
   ├─ DiagramControls.tsx  # Control-Buttons (Expand/Collapse)
   ├─ DiagramTitle.tsx     # Titel-Komponente
   └─ DiagramTooltip.tsx   # Tooltip für Nodes

src/functions/             # Hilfsfunktionen (außerhalb InteractiveDiagram/)
├─ registryFunctions/      # Registry-Verwaltung
│  ├─ registryStore.tsx    # Zentrale Diagramm-Speicherung
│  ├─ registryHelpers.tsx  # Hilfs- und Validierungsfunktionen
│  └─ mainDiagramRegistry/ # Hauptdiagramm-Registrierung
├─ factoryFunctions/       # Diagramm-Erstellung
│  └─ diagramFactory.tsx   # Factory-Funktionen
└─ diagramFunctions/       # Diagramm-Logik
   ├─ elkLayout-utils.tsx  # ELK-Layout-Berechnung
   └─ diagramNodeClickHandler.tsx  # Node-Klick-Handler

src/configs/               # Konfigurationen (außerhalb InteractiveDiagram/)
├─ mainDiagram/            # Hauptdiagramm-Definition
│  ├─ nodes.tsx            # Node-Definitionen
│  └─ edges.tsx            # Edge-Definitionen
├─ elkLayoutOptions.tsx    # ELK-Layout-Optionen
├─ nodeDimensions.tsx      # Node-Dimensionen
└─ diagramConfigs.tsx      # Diagramm-Konfigurationen
```

### components/

Alle React-Komponenten für die Darstellung:

- **nodes/** - Node-Komponenten (`DiagramNode`, `NodeControls`, `customNodeTypes`)
- **edges/** - Edge-Komponenten (`FloatingEdge`, `customEdgeTypes`)
- **TableComponent/** - Tabellen-Renderer für verschiedene Datentypen
- **DiagramControls.tsx** - Steuerungselemente (Expand/Collapse All)
- **DiagramTitle.tsx** - Diagramm-Titel mit Navigation
- **DiagramTooltip.tsx** - Hover-Tooltips für Nodes

### src/functions/ (außerhalb InteractiveDiagram)

Hilfsfunktionen organisiert nach Verantwortlichkeit:

#### registryFunctions/

- **registryStore.tsx** - Zentrale Speicherung aller Diagramme (`diagramRegistry`)
- **registryHelpers.tsx** - Hilfsfunktionen für Registrierung (`registerDiagram`, `tryRegisterDiagram`, `prepareTreeConfig`, `initTreeConfig`)
- **mainDiagramRegistry/** - Registrierungsfunktion für das Hauptdiagramm

#### factoryFunctions/

- **diagramFactory.tsx** - Erstellt Diagramme aus Konfigurationen (`createFlexibleDiagram`, `createTreeDiagram`)
- **diagramExpandCollapse.tsx** - Funktionen zum Ein-/Ausklappen von Tree-Nodes (`saveExpandState`, `restoreExpandState`, `collapseDeep`)

#### diagramFunctions/

- **elkLayout-utils.tsx** - Layout-Berechnung mit ELK.js
- **diagramNodeClickHandler.tsx** - Event-Handler für Node-Klicks (Navigation, Collapse, Tables)
- **loadDiagramOnDemand.tsx** - On-demand Laden von Subdiagrammen

### src/configs/ (außerhalb InteractiveDiagram)

- **mainDiagram/** - Hauptdiagramm-Definition (nodes.tsx, edges.tsx)
- **elkLayoutOptions.tsx** - ELK-Layout-Optionen
- **nodeDimensions.tsx** - Node-Dimensionen und Größen
- **diagramConfigs.tsx** - Allgemeine Diagramm-Konfigurationen

### src/types/

- **diagram.ts** - Typdefinitionen für `DiagramNode`, `DiagramEdge`, Konfigurationsoptionen
- **transform.ts** - Transformations-Typen

## Beispiel: Hauptdiagramm

Das Hauptdiagramm wird in `src/functions/registryFunctions/mainDiagramRegistry/` registriert. Die Knoten und Kanten sind in `src/configs/mainDiagram/` definiert. Bei der Registrierung wird ein `FlexibleDiagramConfig` erstellt und an die Factory übergeben:

```tsx
// src/functions/registryFunctions/mainDiagramRegistry/index.tsx
export function registerMainDiagram(): void {
  tryRegisterDiagram("root", () => {
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
```

## Eigenes Subdiagramm hinzufügen

Subdiagramme werden on-demand geladen. Um ein neues Subdiagramm hinzuzufügen:

1. Konfiguration unter `src/configs/` anlegen (z.B. `mySubdiagram/nodes.tsx` und `edges.tsx`)
2. Registrierungsfunktion erstellen, die beim ersten Aufruf das Diagramm registriert
3. Einen Knoten im Hauptdiagramm mit der entsprechenden ID versehen, damit beim Klick das Subdiagramm geladen wird

### Beispiel für ein Subdiagramm

```tsx
// src/configs/mySubdiagram/registerMySubdiagram.tsx
import { tryRegisterDiagram } from "@/functions/registryFunctions";
import { createFlexibleDiagram } from "@/functions/factoryFunctions";
import type { FlexibleDiagramConfig } from "@/types";

export function registerMySubdiagram() {
  tryRegisterDiagram("mySubdiagram", () => {
    const config: FlexibleDiagramConfig = {
      nodes: [
        { id: "n1", data: { label: "Node 1" } },
        { id: "n2", data: { label: "Node 2" } },
      ],
      edges: [
        { source: "n1", target: "n2" },
      ],
    };
    
    createFlexibleDiagram("mySubdiagram", config, {
      defaultNodeType: 'custom',
      defaultEdgeType: 'floating',
    });
  });
}
```

---

## Erweiterbarkeit

- Neue Knotentypen können durch Hinzufügen einer neuen CSS-Klasse und Ergänzen in `nodeDimensionMap` in `src/configs/nodeDimensions.tsx` eingeführt werden.
- Die Layout-Engine (ELK.js) kann über die Optionen in `src/configs/elkLayoutOptions.tsx` oder individuell bei der Diagramm-Factory (`elkOptions`) angepasst werden.
- Die Architektur erlaubt beliebig viele Subdiagramme, die on-demand geladen werden.

---

## Troubleshooting

- **Diagramm wird nicht angezeigt:** Prüfe, ob das Diagramm korrekt in der Registry registriert wurde und die IDs stimmen.
- **Layout sieht falsch aus:** Überprüfe die Knotendimensionen und die ELK-Optionen.
- **Klick auf Knoten funktioniert nicht:** Stelle sicher, dass die ID des Knotens mit der Subdiagramm-ID übereinstimmt und das Subdiagramm registriert ist.

---

## Weiterführende Links

- [React Flow Dokumentation](https://reactflow.dev/)
- [ELK.js Layout-Engine](https://eclipse.dev/elk/)
