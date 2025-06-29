import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { HistoryEntry } from '..';
import type { UploadHistoryEntry } from '../../../shared/type/types';

describe('HistoryEntry', () => {
    const mockEntry: UploadHistoryEntry = {
        id: 'abc123',
        filename: 'test.csv',
        createdAt: new Date().toISOString(),
        status: 'success',
        stats: {
            total_spend_galactic: 234120,
            rows_affected: 430,
            less_spent_at: 42340,
            big_spent_at: 5340,
            less_spent_value: 4230,
            big_spent_value: 430,
            average_spend_galactic: 2340,
            big_spent_civ: 'humans',
            less_spent_civ: 'monsters',
        },
    };

    it('отображает имя файла', () => {
        render(<HistoryEntry entry={mockEntry} onSelect={() => {}} onRemove={() => {}} />);

        expect(screen.getByText(/test\.csv/i)).toBeInTheDocument();
    });

    it('рендерит кнопку удаления', () => {
        render(<HistoryEntry entry={mockEntry} onSelect={() => {}} onRemove={() => {}} />);

        expect(screen.getByRole('button')).toBeInTheDocument();
    });
});
