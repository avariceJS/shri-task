import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import HomePage from '../HomePage';

vi.mock('../../widgets/FileUploaderWidget', () => ({
    FileUploaderWidget: () => <div data-testid="upload-widget">Uploader</div>,
}));

describe('HomePage', () => {
    it('рендерит FileUploaderWidget', () => {
        render(<HomePage />);
        expect(screen.getByTestId('upload-widget')).toBeInTheDocument();
    });
});
