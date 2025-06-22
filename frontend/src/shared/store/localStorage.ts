import type { UploadHistoryEntry } from "../type/types";

const STORAGE_KEY = "upload-history";

export const saveHistory = (history: UploadHistoryEntry[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
};

export const loadHistory = (): UploadHistoryEntry[] | null => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    try {
        return JSON.parse(stored);
    } catch {
        console.warn("История повреждена");
        return null;
    }
};

export const clearHistoryStorage = () => {
    localStorage.removeItem(STORAGE_KEY);
};
