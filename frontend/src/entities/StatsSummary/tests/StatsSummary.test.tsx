import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import type { StatsEntry } from '../../../shared/type/types';
import { StatsSummary } from '..';

describe('StatsSummary', () => {
    const stats: StatsEntry = {
        total_spend_galactic: 200,
        rows_affected: 10,
        less_spent_at: 432423,
        big_spent_at: 42352323,
        less_spent_value: 10,
        big_spent_value: 50,
        average_spend_galactic: 20,
        big_spent_civ: 'Mon Calamari',
        less_spent_civ: 'Gungan',
    };

    it('должен отображать все карточки статистики', () => {
        render(<StatsSummary stats={stats} />);

        expect(screen.getByText(/общие расходы/i)).toBeInTheDocument();
        expect(screen.getByText(/цивилизация с максимальными расходами/i)).toBeInTheDocument();
        expect(screen.getByText(/Mon Calamari/i)).toBeInTheDocument();
        expect(screen.getByText(/Gungan/i)).toBeInTheDocument();
    });
});
