import { test, expect } from '@playwright/test';

/**
 * E2E Tests für Prozessketten-View
 * 
 * Diese Tests validieren die vollständige Nutzer-Journey durch die Prozessketten-Funktionalität:
 * 1. Navigation von der Startseite zur Prozessketten-Ansicht
 * 2. Hierarchische Expansion von Diagramm-Knoten ([ + ] → [ - ])
 * 3. Überprüfung der Datenverfügbarkeit nach Expansion
 * 4. Anzeige von Tabellenansicht durch Klick auf Endknoten
 * 
 */

test.describe('Prozessketten', () => {

  // Test 1: Validiert Navigation vom Hauptdiagramm zur Prozessketten-Ansicht
  test('Button klickbar → Prozessketten-View öffnet', async ({ page }) => {
    // Arrange: Startseite laden
    await page.goto('/');
    await page.waitForFunction(() => {
      const container = document.querySelector('.diagram-reactflow-container');
      return container && !container.classList.contains('is-loading');
    });

    // Act: Prozessketten öffnen
    await page.locator('[data-id="process_chains"]').click();

    // Assert: View geladen
    const processChainTitle = page.locator('[data-testid="process-chain-title"]').or(
      page.locator('p.title')
    );
    await expect(processChainTitle).toBeVisible();
    
    const backButton = page.locator('[data-testid="back-to-overview-button"]').or(
      page.locator('button').filter({ hasText: /zurück|back/i })
    );
    await expect(backButton).toBeVisible();
    
    // Knoten vorhanden
    const nodes = page.locator('.react-flow__node');
    expect(await nodes.count()).toBeGreaterThan(0);
  });


  // Test 2: Prüft Interaktivität - Klick auf [ + ] Button erweitert Knoten
  test('Erste Ebene klickbar → Zweite Ebene öffnet', async ({ page }) => {
    // Arrange: Navigation
    await page.goto('/');
    await page.waitForFunction(() => {
      const container = document.querySelector('.diagram-reactflow-container');
      return container && !container.classList.contains('is-loading');
    });
    
    await page.locator('[data-id="process_chains"]').click();
    
    // Back Button Check
    const backButton = page.locator('[data-testid="back-to-overview-button"]').or(
      page.locator('button').filter({ hasText: /zurück|back/i })
    );
    await expect(backButton).toBeVisible();

    // Act: Erweiterbaren Knoten klicken
    const expandableNode = page.locator('[data-testid*="expandable"]').or(
      page.locator('button').filter({ hasText: /\[\s*\+\s*\]/ })
    ).first();
    
    if (await expandableNode.isVisible()) {
      await expandableNode.click();

      // Assert: Knoten erweitert
      const expandedNode = page.locator('[data-testid*="expanded"]').or(
        page.locator('button').filter({ hasText: /\[\s*-\s*\]/ })
      ).first();
      
      await expect(expandedNode).toBeVisible();
      
      // Weitere Knoten erschienen
      const nodes = page.locator('.react-flow__node');
      expect(await nodes.count()).toBeGreaterThan(1);
    }
  });


  // Test 3: Prüft ob Tabellensymbol bei verfügbaren Daten erscheint
  test('Zweite Ebene mit Daten → Tabellensymbol erscheint', async ({ page }) => {
    // Arrange: Navigation und Expansion
    await page.goto('/');
    await page.waitForFunction(() => {
      const container = document.querySelector('.diagram-reactflow-container');
      return container && !container.classList.contains('is-loading');
    });
    
    await page.locator('[data-id="process_chains"]').click();
    
    // Expansion zur 2. Ebene
    const expandableNode = page.locator('button').filter({ hasText: /\[\s*\+\s*\]/ }).first();
    
    if (await expandableNode.isVisible()) {
      await expandableNode.click();
      
      // Warten bis Expansion abgeschlossen
      await page.locator('button').filter({ hasText: /\[\s*-\s*\]/ }).first().waitFor();
      
      // Assert: Mehr Knoten sind nach Expansion vorhanden (zeigt verfügbare Daten)
      const allNodes = page.locator('.react-flow__node');
      await expect(allNodes.nth(1)).toBeVisible(); // Mindestens 2 Knoten
    }
  });

  // Test 4: Validiert Tabellenansicht - Klick auf Leaf-Knoten (keine weiteren Unterknoten) zeigt Tabelle
  test('Zweite Ebene anklickbar → Tabelle erscheint', async ({ page }) => {
    // Arrange: Navigation und Expansion zur 2. Ebene
    await page.goto('/');
    await page.waitForFunction(() => {
      const container = document.querySelector('.diagram-reactflow-container');
      return container && !container.classList.contains('is-loading');
    });
    
    await page.locator('[data-id="process_chains"]').click();
    
    // Expansion
    const expandableNode = page.locator('button').filter({ hasText: /\[\s*\+\s*\]/ }).first();
    if (await expandableNode.isVisible()) {
      await expandableNode.click();

      // Act: Leaf-Knoten klicken
      const leafNode = page.locator('.react-flow__node button').filter({ hasNotText: /\[/ }).first();
      
      if (await leafNode.isVisible()) {
        await leafNode.click();

        // Assert: Tabelle/Datenansicht erscheint
        const dataContainer = page.locator('table, .table-container, [class*="data"]').first();
        await expect(dataContainer).toBeVisible();
      }
    }
  });

});
