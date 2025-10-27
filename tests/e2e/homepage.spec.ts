import { test, expect } from '@playwright/test';

/**
 * Testsuite für die Homepage
 * Überprüft die grundlegenden Funktionalitäten und das Rendering der Startseite
 * einschließlich Willkommensnachrichten und interaktiver Diagramme.
 * AAA-Pattern (Arrange-Act-Assert) Kommentare sind in den Tests enthalten, um die Struktur zu verdeutlichen.
 */
test.describe('Homepage', () => {

  // Test 1: Willkommensnachricht sichtbar
  test('Homepage laden → Willkommensnachricht anzeigen', async ({ page }) => {
    // Arrange: Navigation zur Startseite
    await page.goto('/');

    // Act: Suche nach der Hauptüberschrift
    const welcomeHeading = page.locator('h1.title');

    // Assert: Überprüfen, dass die Willkommensnachricht sichtbar ist
    await expect(welcomeHeading).toBeVisible();
  });

  // Test 2: Header-Navigation sichtbar
  test('Header prüfen → Navigation korrekt anzeigen', async ({ page }) => {
    // Arrange: Navigation zur Startseite
    await page.goto('/');

    // Act: Suche nach Header-Elementen
    const logo = page.locator('img[src*="logo_DFBZ"]');
    const logoHomeLink = page.locator('a[href="/"]').first();
    const uploadLink = page.getByRole('link', { name: /upload/i });
    const apiLink = page.getByRole('link', { name: /api/i });

    // Assert: Überprüfen, dass alle Header-Elemente sichtbar sind
    await expect(logo).toBeVisible();
    await expect(logoHomeLink).toBeVisible();
    await expect(uploadLink).toBeVisible();
    await expect(apiLink).toBeVisible();
  });


  // Test 3: Sprachauswahl funktioniert
  test('Sprachbutton klicken → Sprachauswahl funktioniert', async ({ page }) => {
    // Arrange: Navigation zur Startseite
    await page.goto('/');
    await page.waitForLoadState('networkidle'); // Sicherstellen, dass die Seite vollständig geladen ist

    // Act & Assert: Sprachbuttons sind verfügbar
    const enButton = page.locator('.lang-button').filter({ hasText: 'EN' });
    const deButton = page.locator('.lang-button').filter({ hasText: 'DE' });

    await expect(enButton).toBeVisible();
    await expect(deButton).toBeVisible();

    // Act: Auf verfügbare (enabled) Sprachbutton klicken
    const availableButton = await enButton.isEnabled() ? enButton : deButton;
    const otherButton = await enButton.isEnabled() ? deButton : enButton;

    await availableButton.click();
    await page.waitForTimeout(300);

    // Assert: Sprachbutton-Status hat sich geändert
    await expect(availableButton).toBeDisabled(); // Jetzt aktiv
    await expect(otherButton).toBeEnabled();      // Jetzt verfügbar
  });


  // Test 4: Alle Diagramm-Buttons sichtbar & klickbar
  test('Diagramm laden → Alle Navigation-Buttons bereitstellen', async ({ page }) => {
    // Arrange: Navigation zur Startseite
    await page.goto('/');

    // Act: Warten bis Diagramm vollständig geladen ist
    await page.waitForFunction(() => {
      const container = document.querySelector('.diagram-reactflow-container');
      return container && !container.classList.contains('is-loading');
    });

    // Assert: Überprüfen, dass alle 6 Hauptkategorien-Buttons vorhanden und sichtbar sind
    await expect(page.locator('[data-id="xducts"]')).toBeVisible();
    await expect(page.locator('[data-id="conversion_procedures"]')).toBeVisible();
    await expect(page.locator('[data-id="mix"]')).toBeVisible();
    await expect(page.locator('[data-id="process_chains"]')).toBeVisible();
    await expect(page.locator('[data-id="supply_tasks"]')).toBeVisible();
    await expect(page.locator('[data-id="supply_concepts"]')).toBeVisible();

    // Assert: Zusätzliche Validierung, dass alle Buttons klickbar sind
    const allButtons = [
      page.locator('[data-id="xducts"]'),
      page.locator('[data-id="conversion_procedures"]'),
      page.locator('[data-id="mix"]'),
      page.locator('[data-id="process_chains"]'),
      page.locator('[data-id="supply_tasks"]'),
      page.locator('[data-id="supply_concepts"]')
    ];

    for (const button of allButtons) {
      await expect(button).toBeEnabled();
    }
  });

});