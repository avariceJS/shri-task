import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import GeneratePage from '../GeneratePage';

vi.mock('../../features/GenerateReportButton', () => ({
    GenerateReportButton: () => <button>Mock Button</button>,
}));

describe('GeneratePage', () => {
    it('рендерит заголовок и кнопку генерации', () => {
        render(<GeneratePage />);
        expect(screen.getByText(/сгенерируйте готовый csv-файл/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /mock button/i })).toBeInTheDocument();
    });
});
