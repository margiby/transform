# Testprotokoll - BET Bio Energy Technology Database

## Testüberdeckung

### E2E Tests

**Homepage:** (4 Tests)

1. Willkommensnachricht und Hauptüberschrift
2. Header-Navigation (Logo, Upload, API Links)
3. Sprachauswahl-Funktionalität (DE/EN)
4. Vollständige Diagramm-Button Überdeckung (6 Hauptkategorien)

**Prozessketten:** (4 Tests)

1. Navigation zur Prozessketten-View
2. Erste Ebene Expansion (Knoten-Erweiterung)
3. Datenverfügbarkeit nach Expansion
4. Zweite Ebene Tabellenansicht

### Component Tests

**LoadingSpinner:** (5 Tests)

- Standard-Nachricht anzeigen
- Benutzerdefinierte Nachricht anzeigen
- Spinner ohne Nachricht anzeigen
- React-Node als Nachricht anzeigen
- Korrekte CSS-Klassen prüfen

### Unit Tests

**prepareTreeConfig:** (3 Tests)

1. First load ohne existierendes Diagramm
2. Expand-State speichern und wiederherstellen
3. collapseDeep setzt collapsed flags korrekt

## Ausführung der Tests

```bash
# Unit Tests (Vitest)
npm test
# oder
npm run test:unit
# mit Watch-Mode
npm test -- --watch

# E2E Tests (Playwright)
npm run test:e2e
# oder
npx playwright test

# Component Tests  
npm run test:ct

# Test Report anzeigen (E2E)
npx playwright show-report
```

---

## E2E Tests (End-to-End)

### TC-001: Homepage - Willkommensnachricht anzeigen

**Beschreibung:** Homepage laden → Willkommensnachricht anzeigen  
**Testtyp:** E2E  
**Datei:** `/tests/e2e/homepage.spec.ts`  
**Erwartetes Ergebnis:** Die Hauptüberschrift (h1.title) wird sichtbar angezeigt

### TC-002: Homepage - Header-Navigation korrekt anzeigen

**Beschreibung:** Header prüfen → Navigation korrekt anzeigen  
**Testtyp:** E2E  
**Datei:** `/tests/e2e/homepage.spec.ts`  
**Erwartetes Ergebnis:** Logo, Home-Link, Upload-Link und API-Link sind alle sichtbar (semantische Role-Selektoren)

### TC-003: Homepage - Sprachauswahl funktioniert

**Beschreibung:** Sprachbutton klicken → Sprachauswahl funktioniert  
**Testtyp:** E2E  
**Datei:** `/tests/e2e/homepage.spec.ts`  
**Erwartetes Ergebnis:** Sprachbuttons sind funktional, aktiver Button wird disabled, anderer enabled

### TC-004: Homepage - Alle Diagramm-Buttons für Navigation

**Beschreibung:** Diagramm laden → Alle Navigation-Buttons bereitstellen  
**Testtyp:** E2E  
**Datei:** `/tests/e2e/homepage.spec.ts`  
**Erwartetes Ergebnis:** Alle Diagramm-Buttons (xducts, conversion_procedures, mix, process_chains, supply_tasks, supply_concepts) sind sichtbar und klickbar

### TC-005: Prozessketten - Navigation zur Prozessketten-View

**Beschreibung:** Navigation vom Hauptdiagramm zur Prozessketten-Ansicht  
**Testtyp:** E2E  
**Datei:** `/tests/e2e/prozessketten.spec.ts`  
**Erwartetes Ergebnis:** Button funktioniert, View erscheint, Zurück-Button sichtbar

### TC-006: Prozessketten - Erste Ebene Expansion

**Beschreibung:** Erweiterung von Knoten der ersten Ebene  
**Testtyp:** E2E  
**Datei:** `/tests/e2e/prozessketten.spec.ts`  
**Erwartetes Ergebnis:** [ + ] Button wird zu [ - ], weitere Knoten erscheinen

### TC-007: Prozessketten - Zweite Ebene Daten verfügbar

**Beschreibung:** Überprüfung dass nach Expansion Daten verfügbar sind  
**Testtyp:** E2E  
**Datei:** `/tests/e2e/prozessketten.spec.ts`  
**Erwartetes Ergebnis:** Nach [ + ] Klick erscheinen weitere Knoten (zeigt Datenverfügbarkeit)

### TC-008: Prozessketten - Tabelle durch Leaf-Node

**Beschreibung:** Tabellenansicht durch Klick auf Endknoten  
**Testtyp:** E2E  
**Datei:** `/tests/e2e/prozessketten.spec.ts`  
**Erwartetes Ergebnis:** Klick auf Leaf-Knoten öffnet Tabellen-/Datenansicht

---

## Komponententests (Component Tests)

### TC-009: LoadingSpinner - Standard-Nachricht anzeigen

**Beschreibung:** Test ob LoadingSpinner mit Standard-Nachricht korrekt rendert  
**Testtyp:** Component Test  
**Datei:** `/tests/components/LoadingSpinner.ct.tsx`  
**Erwartetes Ergebnis:** Spinner ist sichtbar, Standard-Text "Lädt..." wird angezeigt

### TC-010: LoadingSpinner - Benutzerdefinierte Nachricht

**Beschreibung:** Test ob LoadingSpinner mit benutzerdefinierter Nachricht korrekt rendert  
**Testtyp:** Component Test  
**Datei:** `/tests/components/LoadingSpinner.ct.tsx`  
**Erwartetes Ergebnis:** Benutzerdefinierte Nachricht wird anstelle der Standard-Nachricht angezeigt

### TC-011: LoadingSpinner - Spinner ohne Nachricht

**Beschreibung:** Test ob LoadingSpinner mit spinnerOnly-Prop nur den Spinner anzeigt  
**Testtyp:** Component Test  
**Datei:** `/tests/components/LoadingSpinner.ct.tsx`  
**Erwartetes Ergebnis:** Spinner ist sichtbar, keine Textnachricht wird angezeigt

### TC-012: LoadingSpinner - React-Node als Nachricht

**Beschreibung:** Test ob LoadingSpinner mit React-Element als Nachricht korrekt rendert  
**Testtyp:** Component Test  
**Datei:** `/tests/components/LoadingSpinner.ct.tsx`  
**Erwartetes Ergebnis:** Custom React-Node wird korrekt gerendert und ist sichtbar

### TC-013: LoadingSpinner - CSS-Klassen vorhanden

**Beschreibung:** Test ob alle notwendigen CSS-Klassen korrekt gesetzt sind  
**Testtyp:** Component Test  
**Datei:** `/tests/components/LoadingSpinner.ct.tsx`  
**Erwartetes Ergebnis:** loading-spinner-container und loading-spinner Klassen sind vorhanden und sichtbar

---

## Unit Tests (Vitest)

### TC-014: prepareTreeConfig - Erstes Laden ohne Diagramm

**Beschreibung:** Test ob Tree korrekt kollabiert wird wenn kein Diagramm existiert  
**Testtyp:** Unit Test  
**Datei:** `/tests/unit/prepareTreeConfig.test.ts`  
**Erwartetes Ergebnis:** Funktion gibt `false` zurück, Tree wird kollabiert

### TC-015: prepareTreeConfig - Expand-State wiederherstellen

**Beschreibung:** Test ob Expand-State korrekt gespeichert und wiederhergestellt wird  
**Testtyp:** Unit Test  
**Datei:** `/tests/unit/prepareTreeConfig.test.ts`  
**Erwartetes Ergebnis:** Funktion gibt `true` zurück, altes Diagramm wird gelöscht, State wird übertragen

### TC-016: collapseDeep - Collapsed Flags setzen

**Beschreibung:** Test ob collapseDeep alle Knoten ab Tiefe >= 1 kollabiert  
**Testtyp:** Unit Test  
**Datei:** `/tests/unit/prepareTreeConfig.test.ts`  
**Erwartetes Ergebnis:** Root bleibt expanded, Child-Knoten werden collapsed

---
