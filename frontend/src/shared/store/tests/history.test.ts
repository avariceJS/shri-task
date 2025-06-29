import { describe, it, expect, vi, beforeEach } from 'vitest';
import { historyActions } from '../history';
import type { UploadHistoryEntry } from '../../type/types';

describe('store/history', () => {
    const set = vi.fn();
    const get = vi.fn();
    const entry: UploadHistoryEntry = {
        id: '123',
        createdAt: '2023-01-01T00:00:00Z',
        filename: 'test.csv',
        status: 'success',
    };

    beforeEach(() => {
        localStorage.clear();
        set.mockClear();
        get.mockReset();
    });

    const actions = historyActions(set, get);

    it('addToHistory добавляет запись и сохраняет в localStorage', () => {
        get.mockReturnValue({ uploadHistory: [] });
        actions.addToHistory(entry);
        expect(set).toHaveBeenCalledWith({ uploadHistory: [entry] });
        expect(localStorage.getItem('upload-history')).toContain('test');
    });

    it('removeFromHistory удаляет запись по id', () => {
        get.mockReturnValue({ uploadHistory: [entry] });
        actions.removeFromHistory('123');
        expect(set).toHaveBeenCalledWith({ uploadHistory: [] });
    });

    it('clearHistory очищает localStorage и состояние', () => {
        localStorage.setItem('upload-history', 'data');
        actions.clearHistory();
        expect(localStorage.getItem('upload-history')).toBeNull();
        expect(set).toHaveBeenCalledWith({ uploadHistory: [] });
    });

    it('loadHistoryFromStorage загружает и парсит данные', () => {
        localStorage.setItem('upload-history', JSON.stringify([entry]));
        actions.loadHistoryFromStorage();
        expect(set).toHaveBeenCalledWith({ uploadHistory: [entry] });
    });

    it('loadHistoryFromStorage с некорректным JSON не вызывает set', () => {
        localStorage.setItem('upload-history', 'невалид');
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
        actions.loadHistoryFromStorage();
        expect(set).not.toHaveBeenCalled();
        expect(warn).toHaveBeenCalledWith('История повреждена');
        warn.mockRestore();
    });
});
