import { render, fireEvent, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { StatsModal } from '..';
import type { UploadHistoryEntry } from '../../../shared/type/types';

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

describe('StatsModal', () => {
    it('должен отображать значения статистики', () => {
        render(<StatsModal entry={mockEntry} onClose={() => {}} />);

        expect(screen.getByText(/общие расходы/i)).toBeInTheDocument();
        expect(screen.getByText(/записей/i)).toBeInTheDocument();
        expect(screen.getByText(/макс\. сумма за день/i)).toBeInTheDocument();
        expect(screen.getByText(/humans/i)).toBeInTheDocument();
        expect(screen.getByText(/monsters/i)).toBeInTheDocument();
    });

    it('должен вызывать onClose при клике по подложке', () => {
        const onClose = vi.fn();
        render(<StatsModal entry={mockEntry} onClose={onClose} />);

        const backdrop = screen.getByTestId('modal-backdrop');
        fireEvent.click(backdrop);
        expect(onClose).toHaveBeenCalled();
    });

    it('не должен закрываться, если клик по модальному окну', () => {
        const onClose = vi.fn();
        render(<StatsModal entry={mockEntry} onClose={onClose} />);

        const modal = screen.getByTestId('modal-container');
        fireEvent.click(modal);
        expect(onClose).not.toHaveBeenCalled();
    });

    it('не должен рендериться, если entry.stats отсутствует', () => {
        const { container } = render(
            <StatsModal entry={{ ...mockEntry, stats: undefined }} onClose={() => {}} />,
        );
        expect(container.firstChild).toBeNull();
    });
});
