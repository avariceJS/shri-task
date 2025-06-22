import type {SetState, State } from "./types";

export const setters = (set: SetState<State>) => ({
    setSelectedEntry: (entry: State["selectedEntry"]) =>
        set({ selectedEntry: entry }),
    setVisibleCount: (count: number) => set({ visibleCount: count }),
    resetHistoryUIState: () => set({ selectedEntry: null, visibleCount: 4 }),

    setFile: (file: File | null) => set({ file }),
    setLoading: (loading: boolean) => set({ loading }),
    setError: (error: string | null) => set({ error }),
    setStats: (stats: State["stats"]) => set({ stats }),
    setIsParsing: (val: boolean) => set({ isParsing: val }),
    setIsParsed: (val: boolean) => set({ isParsed: val }),
    setDragActive: (val: boolean) => set({ dragActive: val }),
    setIsGenerating: (val: boolean) => set({ isGenerating: val }),
    setIsGenerated: (val: boolean) => set({ isGenerated: val }),
    setGeneratedFile: (file: File | null) => set({ generatedFile: file }),
});
