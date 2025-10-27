import { create } from "zustand";
import type { Store } from "@/types";

/**
 * Zustand Store für Diagramm-bezogene Zustände
 */
const useDiagramStore = create<Store>((set) => ({
  diagramId: "root",
  setDiagramId: (id) => set({ diagramId: id }),
  tableData: null,
  setTableData: (data) => set({ tableData: data }),
  isLoadingSubdiagram: false,
  setIsLoadingSubdiagram: (loading) => set({ isLoadingSubdiagram: loading }),
}));

export default useDiagramStore;
