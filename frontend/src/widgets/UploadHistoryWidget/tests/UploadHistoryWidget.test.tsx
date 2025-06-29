import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { UploadHistoryWidget } from '..';

const mockedUseStore = vi.hoisted(() => ({
    useStore: vi.fn(),
}));

vi.mock('../../../shared/store/useStore', () => mockedUseStore);

describe('UploadHistoryWidget', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('отображает заголовок, запись и кнопку, если история есть', () => {
        mockedUseStore.useStore.mockReturnValue({
            uploadHistory: [
                {
                    id: '1',
                    filename: 'file.csv',
                    stats: [],
                    createdAt: Date.now(),
                    status: 'success',
                },
            ],
            visibleCount: 4,
            selectedEntry: null,
            setVisibleCount: vi.fn(),
            setSelectedEntry: vi.fn(),
            resetHistoryUIState: vi.fn(),
            clearHistory: vi.fn(),
            removeFromHistory: vi.fn(),
            loadHistoryFromStorage: vi.fn(),
        });

        render(
            <MemoryRouter>
                <UploadHistoryWidget />
            </MemoryRouter>,
        );

        expect(screen.getByText(/история загрузок/i)).toBeInTheDocument();
        expect(screen.getByText(/file\.csv/i)).toBeInTheDocument();
        expect(screen.getByText(/очистить/i)).toBeInTheDocument();
    });

    it('не отображает записи, если история пуста', () => {
        mockedUseStore.useStore.mockReturnValue({
            uploadHistory: [],
            loadHistoryFromStorage: vi.fn(),
        });

        render(
            <MemoryRouter>
                <UploadHistoryWidget />
            </MemoryRouter>,
        );

        const entry = screen.queryByTestId('history-entry');
        expect(entry).not.toBeInTheDocument();
    });
});
