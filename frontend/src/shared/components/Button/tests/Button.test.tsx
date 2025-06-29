import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Button } from '..';


describe('Button', () => {
    it('отображает children и применяет правильный класс', () => {
        render(<Button variant="active">Кнопка</Button>);
        const btn = screen.getByRole('button', { name: /кнопка/i });
        expect(btn).toBeInTheDocument();
        expect(btn.className).toMatch(/active/);
    });

    it('использует fallback стиль, если variant не найден', () => {
        render(<Button variant={'clear'}>Очистить</Button>);
        const btn = screen.getByRole('button', { name: /очистить/i });
        expect(btn.className).toMatch(/button/);
    });
});
