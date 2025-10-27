import type { TreeFactoryNodeConfig } from '../../src/types';

/**
 * Erstellt eine lineare Baumstruktur für Tests
 * 
 * @param ids Array von IDs, die als Chain von Knoten erstellt werden
 * @returns Root-Knoten der Tree-Struktur
 * 
 * @example
 * // Erstellt: a -> b -> c
 * const tree = makeTree(['a', 'b', 'c']);
 */
export function makeTree(ids: string[]): TreeFactoryNodeConfig {
  const root: TreeFactoryNodeConfig = { 
    id: ids[0], 
    collapsed: false, 
    children: [], 
    data: { label: ids[0] } 
  };
  
  let current: TreeFactoryNodeConfig = root;
  
  for (let i = 1; i < ids.length; i++) {
    const child: TreeFactoryNodeConfig = { 
      id: ids[i], 
      collapsed: false, 
      children: [], 
      data: { label: ids[i] } 
    };
    current.children = [child];
    current = child;
  }
  
  return root;
}
