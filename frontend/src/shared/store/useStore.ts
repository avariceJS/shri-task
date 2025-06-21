import { create } from "zustand";
import type { StatsEntry, UploadHistoryEntry } from "../type/types";




type State = {
    file: File | null;
    loading: boolean;
    error: string | null;
    stats: StatsEntry[];
    uploadHistory: UploadHistoryEntry[];

    setFile: (file: File | null) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    setStats: (stats: StatsEntry[]) => void;

    addToHistory: (entry: UploadHistoryEntry) => void;
    removeFromHistory: (id: string) => void;
    clearHistory: () => void;

    loadHistoryFromStorage: () => void;
};

const STORAGE_KEY = "upload-history";

export const useStore = create<State>((set, get) => ({
    file: null,
    loading: false,
    error: null,
    stats: [],
    uploadHistory: [],

    setFile: (file) => set({ file }),
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),
    setStats: (stats) => set({ stats }),

    addToHistory: (entry) => {
        const updatedHistory = [entry, ...get().uploadHistory];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
        set({ uploadHistory: updatedHistory });
    },

    removeFromHistory: (id) => {
        const updatedHistory = get().uploadHistory.filter((e) => e.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
        set({ uploadHistory: updatedHistory });
    },

    clearHistory: () => {
        localStorage.removeItem(STORAGE_KEY);
        set({ uploadHistory: [] });
    },

    loadHistoryFromStorage: () => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                const parsed = JSON.parse(stored) as UploadHistoryEntry[];
                set({ uploadHistory: parsed });
            } catch {
                console.warn("История повреждена");
            }
        }
    },
}));
