import { useLocalizedName } from "../Localization";
import type { TableDataArray, BaseProperty } from "@/types";

/**
 * Hook zum Extrahieren und Formatieren von Tabellen-Metadaten
 * Verwendet von TableComponent und TableHeader
 * @param data - Die TableDataArray aus der Tabelle
 * @returns Metadaten: category, group, leaf, title, displayTitle, properties
 */

export const useTableMetadata = (data: TableDataArray) => {
  const getLocalizedName = useLocalizedName();
  
  // Hierarchische Daten aus dem ersten Element extrahieren
  const firstItem = data[0];
  
  // Hierarchische Ebenen extrahieren und lokalisieren
  const category = firstItem?.data?.category ? getLocalizedName(firstItem.data.category) : '';
  const group = firstItem?.data?.group ? getLocalizedName(firstItem.data.group) : '';
  const leaf = firstItem?.data?.leaf ? getLocalizedName(firstItem.data.leaf) : '';
  
  // Hat leaf? 3-Ebenen-Hierarchie : 2-Ebenen-Hierarchie
  const hasLeaf = Boolean(leaf);
  
  // Titel für Dateinamen: "Kategorie → Gruppe → Leaf" oder "Kategorie → Gruppe"
  const titleParts = [category, group, leaf].filter(Boolean);
  const title = titleParts.join(' → ');
  
  // Hierarchischer Titel für UI-Display (2 oder 3 Ebenen)
  const displayTitle = hasLeaf ? (
    // 3-Ebenen: Category → Group → Leaf (Leaf fett)
    <>
      {category && <span className="has-text-grey">{category}</span>}
      {category && group && <span className="has-text-grey"> → </span>}
      {group && <span className="has-text-grey">{group}</span>}
      {group && leaf && <span> → </span>}
      {leaf && <strong>{leaf}</strong>}
    </>
  ) : (
    // 2-Ebenen: Category → Group (Group fett)
    <>
      {category && <span className="has-text-grey">{category}</span>}
      {category && group && <span> → </span>}
      {group && <strong>{group}</strong>}
    </>
  );
  
  // Properties aus allen Items sammeln
  const properties: BaseProperty[] = [];
  data.forEach(item => {
    if (item.data.properties) {
      properties.push(...(item.data.properties as BaseProperty[]));
    }
  });
  
  return {
    category,
    group,
    leaf,
    title,          
    displayTitle,
    properties,
  };
};
