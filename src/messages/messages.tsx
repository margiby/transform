export type LanguageObj = {
  [key: string]: string;
};

export type LanguageData = {
  [key: string]: [string, string];
};

const lang: LanguageData = {
  // Header & Navigation
  app_title: ["BET APP", "BET APP"], // Der Haupttitel und Home-Link
  nav_upload: ["Upload", "Upload"],
  nav_api: ["API", "API"],

  // HomePage spezifische Texte
  homePage_welcome: [
    "BET - Bio Energy Technology Database",
    "BET - Bio Energy Technology Database",
  ],

  presentation_text: [
    `<p>Die Bio-Energy Technology Database (BET) stellt eine Reihe von Konversionstechnologien und Energieversorgungskonzepten sowie Rohstoffe und Energieträger und deren Eigenschaften dar.</p>
<p>Wir versuchen, der Komplexität der Bioenergietechnologien gerecht zu werden, indem wir fünf Grundbausteine identifizieren, die für die meisten Bioenergietechnologieketten beschrieben werden können:</p>
<ul>
<li><b>Versorgungsaufgaben und Versorgungskonzepte</b> (keine Bioenergie-Technologien an sich, aber oft verwendet, um Bioenergie-Anwendungen zu kontextualisieren)</li>
<li><b>Konversionsverfahren und Prozessketten</b> (der thematische Kern der BET)</li>
<li><b>Xdukte</b> (alle Arten von Materialien und Energie wie Rohstoffe und Produkte)</li>
</ul>
<p>Während die Prozessketten die grundlegenden Umwandlungen unterschiedlicher Materialien und Energien darstellen, sind die Konversionsverfahren deren Grundbausteine.</p>
<p>Dotzauer et al. 2024: <link>Advanced SQL-Datenbank für Bioenergietechnologien - Ein Katalog für Bioressourcen, Umwandlungstechnologien, Energieträger und Versorgungsanwendungen</link> gibt einen detaillierteren Überblick.</p>`,
    `<p>The Bio-Energy Technology Database (BET) presents a range of conversion technologies and energy supply concepts as well as feedstocks and energy sources and their characteristics.</p>
<p>We attempt to address the complexity of bioenergy technologies by identifying five basic building blocks that can be described for most bioenergy technology chains:</p>
<ul>
<li><b>Supply tasks and supply concepts</b> (are not bioenergy technologies per se, but have often been used to contextualize bioenergy applications)</li>
<li><b>Conversion procedures and process chains</b> (the thematic core of the BET)</li>
<li><b>Xducts</b> (all types of material and energy such as feedstocks and products)</li>
</ul>
<p>While the process chains represent the fundamental conversions of different materials and energies, the conversion processes are their basic building blocks.</p>
<p>Dotzauer et al. 2024: <link>Advanced SQL-Database for bioenergy technologies - A catalogue for bio-resources, conversion technologies, energy carriers, and supply applications</link> gives a more detailed overview.</p>`,
  ],

  uploadPage_title: ["Datei-Upload", "File Upload"],
  uploadPage_description: [
    "Hier können Sie bald Ihre Daten hochladen.",
    "Here you can soon upload your data.",
  ],
  apiPage_title: ["API Dokumentation", "API Documentation"],
  apiPage_description: [
    "Hier finden Sie bald die API-Dokumentation.",
    "Here you can find soon the API documentation.",
  ],

  // Schlüssel für Content.tsx
  diagram_loading: ["Layout wird berechnet...", "Calculating layout..."],
  diagram_loading_data: ["Lade Daten...", "Loading data..."],
  diagram_loading_data_steps: ["Daten werden verarbeitet...", "Processing data..."],
  diagram_loading_component: ["Lade Diagramm-Komponente...", "Loading diagram component..."],
  diagram_initializing: [
    "Diagramm wird initialisiert...",
    "Diagram is initializing...",
  ],
  diagram_back_button: ["Zurück zur Übersicht", "Back to overview"],
  diagram_fetch_error: [
    "Fehler beim Laden der Diagrammdaten:",
    "Error loading diagram data:",
  ],
  diagram_expand_all: ["Alles aufklappen", "Expand all"],
  diagram_collapse_all: ["Alles zuklappen", "Collapse all"],

  // Diagram Root
  diagram_root_name: ["Hauptdiagramm", "Main Diagram"],

  // Hauptdiagramm Knoten
  xducts_label: ["Xdukte", "Xducts"],
  xducts_description: [
    "Das ist der Ausgangspunkt für alle Produkte und Rohstoffe. -> Klick für mehr Details.",
    "This is the starting point for all products and raw materials. -> Click for more details.",
  ],
  conversion_procedures_label: ["Konversionsverfahren", "Conversion Procedures"],
  conversion_procedures_description: [
    "Verschiedene Verfahren zur Umwandlung von Rohstoffen. -> Klick für mehr Details.",
    "Various methods for converting raw materials. -> Click for more details.",
  ],
  
  mix_label: ["Mix", "Mix"],
  mix_description: [
    "Kombinationen verschiedener Verfahren und Produkte. -> Klick für mehr Details.",
    "Combinations of different processes and products. -> Click for more details.",
  ],
  process_chains_label: ["Prozessketten", "Process Chains"],
  process_chains_description: [
    "Beginn mit Biomasseressourcen, transportierte Zwischenprodukte, Umwandlung zu verschiedenen Energieträgern und schließlich Nutzung in allen Energiesektoren (einschließlich potenzieller Nebenprodukte). -> Klick für mehr Details.",
    "Start with biomass resources, transported intermediates, processing into different energy carriers and finally use in all energy sectors (including potential by-products). -> Click for more details.",
  ],
  supply_tasks_label: ["Versorgungsaufgaben", "Supply Tasks"],
  supply_tasks_description: [
    "Spezifische Aufgaben zur Versorgung und Bereitstellung. -> Klick für mehr Details.",
    "Specific tasks for supply and provision. -> Click for more details.",
  ],
  supply_concepts_label: ["Versorgungskonzepte", "Supply Concepts"],
  supply_concepts_description: [
    "Strategische Konzepte für die Versorgungsplanung. -> Klick für mehr Details.",
    "Strategic concepts for supply planning. -> Click for more details.",
  ],

  // Prozessketten Knoten
  process_chains_leaf_description: [
    "Prozesskette {leaf} aus {group} ({category}) mit {propertyCount} Eigenschaften. -> Klick um die Tabelle zu sehen.",
    "Process chain {leaf} from {group} ({category}) with {propertyCount} properties. -> Click to see the table.",
  ],
  process_chains_group_description: [
    "Prozessgruppe {group} mit {count} Prozessketten. -> Klick um die Ketten zu sehen.",
    "Process group {group} with {count} process chains. -> Click to see the chains.",
  ],
  process_chains_category_description: [
    "Diese Kategorie enthält {count} Gruppierungen. -> Klick für mehr Details.",
    "This category contains {count} groups. -> Click for more details.",
  ],
  process_chains_root_description: [
    "Übersicht aller verfügbaren Prozessketten-Kategorien.",
    "Overview of all available process chain categories.",
  ],

  // Versorgungskonzepte Knoten
  supply_concepts_group_description: [
    "Versorgungskonzept {group} aus Kategorie {category} mit {propertyCount} Eigenschaften. -> Klick um die Tabelle zu sehen.",
    "Supply concept {group} from category {category}. -> Click to see the table.",
  ],
  supply_concepts_category_description: [
    "Konzeptkategorie {category} mit {count} Versorgungskonzepten. -> Klick um die Konzepte zu sehen.",
    "Concept category {category} with {count} supply concepts. -> Click to see the concepts.",
  ],
  supply_concepts_root_description: [
    "Übersicht aller verfügbaren Versorgungskonzept-Kategorien.",
    "Overview of all available supply concept categories.",
  ],

  // Versorgungsaufgaben Knoten
  supply_tasks_group_description: [
    "Versorgungsaufgabe {group} aus Kategorie {category} mit {propertyCount} Eigenschaften. -> Klick um die Tabelle zu sehen.",
    "Supply task {group} from category {category}. -> Click to see the table.",
  ],
  supply_tasks_category_description: [
    "Aufgabenkategorie {category} mit {count} Versorgungsaufgaben. -> Klick um die Aufgaben zu sehen.",
    "Task category {category} with {count} supply tasks. -> Click to see the tasks.",
  ],
  supply_tasks_root_description: [
    "Übersicht aller verfügbaren Versorgungsaufgaben-Kategorien.",
    "Overview of all available supply task categories.",
  ],

  // Xdukte Knoten
  xducts_leaf_description: [
    "Xdukt {leaf} aus Gruppe {group} mit {propertyCount} Eigenschaften. -> Klick um die Tabelle zu sehen.",
    "Xduct {leaf} from group {group}. -> Click to see the table.",
  ],
  xducts_group_description: [
    "Xdukt-Gruppe {group} aus Kategorie {category} mit {count} Xdukten. -> Klick um die Xdukte zu sehen.",
    "Xduct group {group} from category {category} with {count} xducts. -> Click to see the xducts.",
  ],
  xducts_category_description: [
    "Xdukt-Kategorie {category} mit {count} Gruppen. -> Klick um die Gruppen zu sehen.",
    "Xduct category {category} with {count} groups. -> Click to see the groups.",
  ],
  xducts_root_description: [
    "Übersicht aller verfügbaren Xdukt-Kategorien.",
    "Overview of all available xduct categories.",
  ],

    // Konversionsverfahren Knoten
  conversion_procedures_group_description: [
    "Verfahrenskomponente {group} aus Kategorie {category} mit {propertyCount} Eigenschaften. -> Klick um die Tabelle zu sehen.",
    "Procedure component {group} from category {category}. -> Click to see the table.",
  ],
  conversion_procedures_category_description: [
    "Verfahrenskategorie {category} mit {count} Komponenten. -> Klick um die Komponenten zu sehen.",
    "Procedure category {category} with {count} components. -> Click to see the components.",
  ],
  conversion_procedures_root_description: [
    "Übersicht aller verfügbaren Konversionsverfahren-Kategorien.",
    "Overview of all available conversion procedure categories.",
  ],
  
  // Properties table
  no_properties: ["Keine Eigenschaften verfügbar", "No properties available"],
  detailed_properties: ["Eigenschaften für:", "Detailed properties for:"],
  property_name: ["Eigenschaft", "Property"],
  property_value: ["Wert", "Value"],
  property_unit: ["Einheit", "Unit"],
  property_year: ["Jahr", "Year"],
  property_source: ["Quelle", "Source"],
  no_source: ["Keine Quelle", "No source"],
  not_available: ["K/A", "n/a"],
  no_renderer_found: ["Kein passender Renderer für diese Daten gefunden.", "No matching renderer found for this data."],
  export_csv: ["Als CSV exportieren", "Export as CSV"],

  // Footer spezifische Texte
  footer_version: ["Version", "Version"],
  footer_legal_links: ["Rechtliches", "Legal"],
  footer_imprint: ["Impressum", "Imprint"],
  footer_privacy: ["Datenschutz", "Privacy Policy"],
  footer_contact_us: ["Kontakt", "Contact Us"],
  footer_contact_page: ["Kontaktseite", "Contact Page"],
};

const de: LanguageObj = {};
const en: LanguageObj = {};

Object.entries(lang).forEach(([key, val]) => {
  de[key] = val[0];
  en[key] = val[1];
});

export { de, en };
