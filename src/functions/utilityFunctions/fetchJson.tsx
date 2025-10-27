import type { DataSourcePath } from "@/types";

/**
 * Lädt JSON-Daten von einer URL.
 * 
 * @param url - Die URL der JSON-Datei 
 * @returns Die geparsten JSON-Daten
 * @throws Error wenn der Fetch fehlschlägt oder die Response nicht ok ist
 */
export async function fetchJson<T = unknown>(url: DataSourcePath): Promise<T> {
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return await response.json();
}
