import type { StatsEntry, UploadHistoryEntry } from "../type/types";

export type State = {
    file: File | null;
    loading: boolean;
    error: string | null;
    stats: StatsEntry[];
    uploadHistory: UploadHistoryEntry[];
    isParsing: boolean;
    isParsed: boolean;
    dragActive: boolean;
    isGenerating: boolean;
    isGenerated: boolean;
    generatedFile: File | null;

    selectedEntry: UploadHistoryEntry | null;
    visibleCount: number;

    setSelectedEntry: (entry: UploadHistoryEntry | null) => void;
    setVisibleCount: (count: number) => void;
    resetHistoryUIState: () => void;

    setFile: (file: File | null) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    setStats: (stats: StatsEntry[]) => void;
    setIsParsing: (val: boolean) => void;
    setIsParsed: (val: boolean) => void;
    setDragActive: (val: boolean) => void;
    setIsGenerating: (val: boolean) => void;
    setIsGenerated: (val: boolean) => void;
    setGeneratedFile: (file: File | null) => void;
    resetReportState: () => void;

    addToHistory: (entry: UploadHistoryEntry) => void;
    removeFromHistory: (id: string) => void;
    clearHistory: () => void;
    loadHistoryFromStorage: () => void;

    clearFile: () => void;
};

export const STORAGE_KEY = "upload-history";

export type SetState<T> = {
    (partial: Partial<T> | ((state: T) => Partial<T>), replace?: false): void;
    (partial: T | ((state: T) => T), replace: true): void;
};
export type GetState<T> = () => T;
