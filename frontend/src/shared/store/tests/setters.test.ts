import { describe, it, expect, vi } from 'vitest';
import { setters } from '../setters';
import type { StatsEntry } from '../../type/types';

describe('store/setters', () => {
    const set = vi.fn();

    const actions = setters(set);

    it('setFile должен установить файл', () => {
        const file = new File(['test'], 'test.csv', { type: 'text/csv' });
        actions.setFile(file);
        expect(set).toHaveBeenCalledWith({ file });
    });

    it('setError должен установить ошибку', () => {
        actions.setError('ошибка!');
        expect(set).toHaveBeenCalledWith({ error: 'ошибка!' });
    });

    it('setLoading должен установить загрузку', () => {
        actions.setLoading(true);
        expect(set).toHaveBeenCalledWith({ loading: true });
    });

    it('setStats должен установить статистику', () => {
        const stats: StatsEntry[] = [
            {
                total_spend_galactic: 12345,
                rows_affected: 5,
                less_spent_at: 100,
                big_spent_at: 32312,
                less_spent_value: 100,
                big_spent_value: 999,
                average_spend_galactic: 3432,
                big_spent_civ: 'monsters',
                less_spent_civ: 'humans',
            },
        ];
        actions.setStats(stats);
        expect(set).toHaveBeenCalledWith({ stats });
    });

    it('resetHistoryUIState должен сбросить состояние истории', () => {
        actions.resetHistoryUIState();
        expect(set).toHaveBeenCalledWith({ selectedEntry: null, visibleCount: 4 });
    });
});
