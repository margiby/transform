import { describe, it, expect, beforeEach } from 'vitest';

// Types
import type { TreeFactoryNodeConfig, RegisteredDiagram } from '../../src/types';

// Registry
import { diagramRegistry } from '../../src/functions/registryFunctions/registryStore';
import { prepareTreeConfig } from '../../src/functions/registryFunctions/registryHelpers';

// Factory
import { collapseDeep } from '../../src/functions/factoryFunctions/diagramExpandCollapse';

// Test Helpers
import { makeTree } from '../utils/treeTestHelpers';

/**
 * Tests für prepareTreeConfig
 * 
 * Diese Funktion bereitet eine Tree-Config für eine Neu-Registrierung vor:
 * - Speichert den Expand-Zustand eines existierenden Diagramms
 * - Löscht das alte Diagramm aus der Registry
 * - Wendet den gespeicherten Zustand auf die neue Config an
 * 
 * Test 1: Erstes Laden (kein vorheriges Diagramm)
 *   - Gibt false zurück
 *   - Tree-Config bleibt unverändert
 * 
 * Test 2: Neu-Registrierung (Diagramm existiert bereits)
 *   - Gibt true zurück
 *   - Expand-Zustand wird vom alten Diagramm gespeichert
 *   - Altes Diagramm wird aus Registry gelöscht
 *   - Neue Config erhält den gespeicherten Zustand
 * 
 * Test 3: collapseDeep-Funktion
 *   - Kollabiert alle Knoten ab einer bestimmten Tiefe
 *   - Root-Knoten (depth 0) bleibt immer expanded
 */

describe('prepareTreeConfig', () => {
  beforeEach(() => {
    // Registry vor jedem Test leeren
    for (const k of Object.keys(diagramRegistry)) {
      delete diagramRegistry[k];
    }
  });

 // Test 1 - Erstes Laden ohne vorheriges Diagramm

  it('returns false when no previous diagram exists (first load)', () => {
    const tree = makeTree(['a', 'b', 'c']);
    const result = prepareTreeConfig('no-such-diagram', tree);
    
    // Sollte false zurückgeben, da kein vorheriges Diagramm existiert
    expect(result).toBe(false);
    
    // Root sollte nicht kollabiert sein
    expect(tree.collapsed).toBe(false);
  });

  //Test 2 - Neu-Registrierung mit bestehendem Diagramm (Hauptszenario)

  it('saves expand state and deletes old diagram when it exists', () => {
    const oldTree = makeTree(['r', 's', 't']);
    
    // Setze ein Kind auf collapsed=true
    if (oldTree.children && oldTree.children[0]) {
      oldTree.children[0].collapsed = true;
    }
    
    // Simuliere ein existierendes Diagramm mit treeConfig
    const registeredDiagram: RegisteredDiagram = {
      nodes: [],
      edges: [],
      treeConfig: oldTree
    };
    diagramRegistry['my-diagram'] = registeredDiagram;
    
    // Erstelle eine neue Tree-Config
    const newTree = makeTree(['r2', 's2', 't2']);
    const result = prepareTreeConfig('my-diagram', newTree);
    
    // Sollte true zurückgeben, da ein vorheriges Diagramm existierte
    expect(result).toBe(true);
    
    // Das alte Diagramm sollte gelöscht worden sein
    expect(diagramRegistry['my-diagram']).toBeUndefined();
  });

  // Test 3 - collapseDeep Funktion

  it('collapseDeep sets collapsed flags for all children (depth >= 1)', () => {
    const tree = makeTree(['x', 'y', 'z']);
    
    // collapseDeep mit startDepth=0 sollte alle Kinder kollabieren
    collapseDeep(tree, 0);
    
    // Root (depth 0) sollte nicht kollabiert sein
    expect(tree.collapsed).toBe(false);
    
    // Erstes Kind (depth 1) sollte kollabiert sein
    expect(tree.children && tree.children[0]?.collapsed).toBe(true);
  });
});
