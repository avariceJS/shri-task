import type { GetState, SetState, State } from "./types";
import { STORAGE_KEY } from "./types";

export const historyActions = (set: SetState<State>, get: GetState<State>) => ({
    addToHistory: (entry: State["uploadHistory"][number]) => {
        const updated = [entry, ...get().uploadHistory];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        set({ uploadHistory: updated });
    },

    removeFromHistory: (id: string) => {
        const updated = get().uploadHistory.filter((e) => e.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        set({ uploadHistory: updated });
    },

    clearHistory: () => {
        localStorage.removeItem(STORAGE_KEY);
        set({ uploadHistory: [] });
    },

    loadHistoryFromStorage: () => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                const parsed = JSON.parse(stored) as State["uploadHistory"];
                set({ uploadHistory: parsed });
            } catch {
                console.warn("История повреждена");
            }
        }
    },
});
