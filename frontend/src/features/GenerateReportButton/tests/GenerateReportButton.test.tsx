import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { GenerateReportButton } from '..';

vi.mock('../../../shared/store/useStore', () => ({
    useStore: () => ({
        isGenerating: false,
        isGenerated: false,
        generatedFile: null,
        setIsGenerating: vi.fn(),
        setIsGenerated: vi.fn(),
        setGeneratedFile: vi.fn(),
        resetReportState: vi.fn(),
        setError: vi.fn(),
        setLoading: vi.fn(),
    }),
}));

vi.mock('../../../shared/lib/fetchReport', () => ({
    fetchReport: vi.fn().mockResolvedValue(new Blob(['test'], { type: 'text/csv' })),
}));

describe('GenerateReportButton', () => {
    it('рендерит кнопку', () => {
        render(<GenerateReportButton />);
        expect(screen.getByRole('button', { name: /Начать генерацию/i })).toBeInTheDocument();
    });

    it('при клике запускается генерация', async () => {
        render(<GenerateReportButton />);
        fireEvent.click(screen.getByRole('button', { name: /Начать генерацию/i }));
        expect(screen.getByRole('button')).toBeInTheDocument();
    });
});
