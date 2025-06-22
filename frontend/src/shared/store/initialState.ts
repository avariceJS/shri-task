import type { State } from "./types";

export const initialState: Omit<
    State,
    | "setSelectedEntry"
    | "setVisibleCount"
    | "resetHistoryUIState"
    | "setFile"
    | "setLoading"
    | "setError"
    | "setStats"
    | "setIsParsing"
    | "setIsParsed"
    | "setDragActive"
    | "setIsGenerating"
    | "setIsGenerated"
    | "setGeneratedFile"
    | "addToHistory"
    | "removeFromHistory"
    | "clearHistory"
    | "loadHistoryFromStorage"
    | "clearFile"
> = {
    file: null,
    loading: false,
    error: null,
    stats: [],
    uploadHistory: [],
    isParsing: false,
    isParsed: false,
    dragActive: false,
    isGenerating: false,
    isGenerated: false,
    generatedFile: null,

    selectedEntry: null,
    visibleCount: 4,
};
