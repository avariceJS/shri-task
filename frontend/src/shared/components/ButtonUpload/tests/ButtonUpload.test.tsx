import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ButtonUpload, type ButtonProps } from '..';

describe('ButtonUpload', () => {
    it('отображает текст и применяет нужный стиль', () => {
        render(<ButtonUpload variant="parsing">Загрузка</ButtonUpload>);
        const btn = screen.getByRole('button', { name: /загрузка/i });
        expect(btn).toBeInTheDocument();
        expect(btn.className).toMatch(/parsing/);
    });

    it('применяет fallback стиль, если variant невалидный', () => {
        render(<ButtonUpload variant={'unknown' as unknown as ButtonProps['variant']}>Что-то</ButtonUpload>);
        const btn = screen.getByRole('button', { name: /что-то/i });
        expect(btn.className).toMatch(/_active_/);
        expect(btn.className).not.toMatch(/_unknown_/);
    });
});
