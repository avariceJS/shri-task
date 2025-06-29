import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { FileUploaderWidget } from '..';

vi.mock('../../features/hooks/useFileUploader', () => ({
    useFileUploader: () => ({
        file: null,
        loading: false,
        error: null,
        dragActive: false,
        latestStats: null,
        isParsing: false,
        isParsed: false,
        handleFileSelected: vi.fn(),
        handleSendFile: vi.fn(),
        handleDragOver: vi.fn(),
        handleDragLeave: vi.fn(),
        handleDrop: vi.fn(),
        clearFile: vi.fn(),
    }),
}));

describe('FileUploaderWidget', () => {
    it('должен отображать кнопку "Загрузить файл"', () => {
        render(<FileUploaderWidget />);
        expect(screen.getByText(/загрузить файл/i)).toBeInTheDocument();
    });

    it('должен отображать текст "или перетащите сюда"', () => {
        render(<FileUploaderWidget />);
        expect(screen.getByText(/или перетащите сюда/i)).toBeInTheDocument();
    });

    it('кнопка "Отправить" должна быть задизейблена при отсутствии файла', () => {
        render(<FileUploaderWidget />);
        const button = screen.getByRole('button', { name: /отправить/i });
        expect(button).toBeDisabled();
    });
});
