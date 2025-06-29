import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { FileInfo } from '../FileInfo';

describe('FileInfo', () => {
    const defaultProps = {
        onClear: vi.fn(),
        loading: false,
        isParsed: false,
        error: null,
    };

    it('должен отображать переданные children', () => {
        render(
            <FileInfo {...defaultProps}>
                <span>Test content</span>
            </FileInfo>,
        );
        expect(screen.getByText('Test content')).toBeInTheDocument();
    });

    it('должен вызывать onClear при клике на кнопку', () => {
        const onClear = vi.fn();
        render(
            <FileInfo {...defaultProps} onClear={onClear}>
                <span>Test</span>
            </FileInfo>,
        );
        fireEvent.click(screen.getByRole('button', { name: /clear/i }));
        expect(onClear).toHaveBeenCalled();
    });

    it('кнопка очистки должна быть задизейблена при loading=true', () => {
        render(
            <FileInfo {...defaultProps} loading={true}>
                <span>Test</span>
            </FileInfo>,
        );
        const button = screen.getByRole('button', { name: /clear/i });
        expect(button).toBeDisabled();
    });

    it('должен применять стиль "error", если передан error', () => {
        render(
            <FileInfo {...defaultProps} error="Ошибка">
                <span>Test</span>
            </FileInfo>,
        );
        const button = screen.getByText('Test').closest('button');
        expect(button?.className).toContain('error');
    });

    it('должен применять стиль "done", если isParsed=true и нет ошибки', () => {
        render(
            <FileInfo {...defaultProps} isParsed={true}>
                <span>Test</span>
            </FileInfo>,
        );
        const button = screen.getByText('Test').closest('button');
        expect(button?.className).toContain('done');
    });
});
