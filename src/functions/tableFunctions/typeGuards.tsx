import type { BaseProperty } from "@/types";

/**
 * Type Guard: Prüft ob Properties BaseProperty[] sind
 */
export const isPropertyData = (props: unknown[]): props is BaseProperty[] => {
  if (props.length === 0) return false;
  
  const firstProp = props[0];
  if (typeof firstProp !== 'object' || firstProp === null) return false;
  
  // Muss die Basis-Felder haben
  return (
    'property' in firstProp && 
    'unit' in firstProp && 
    'reference' in firstProp &&
    'value' in firstProp
  );
};

/**
 * Prüft ob Properties ein Jahr-Feld haben
 */
export const hasYearField = (properties: BaseProperty[]): boolean => {
  if (properties.length === 0) return false;
  return 'year' in properties[0] && properties[0].year !== undefined;
};
