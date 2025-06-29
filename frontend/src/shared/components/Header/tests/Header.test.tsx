import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Header from '..';

describe('Header', () => {
    it('отображает логотип и заголовок', () => {
        render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>,
        );

        const logos = screen.getAllByAltText(/logo/i);
        expect(logos).toHaveLength(2);
        expect(screen.getByText(/Межгалактическая аналитика/i)).toBeInTheDocument();
    });

    it('отображает все nav ссылки', () => {
        render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>,
        );

        expect(screen.getByText(/CSV Аналитик/i)).toBeInTheDocument();
        expect(screen.getByText(/CSV Генератор/i)).toBeInTheDocument();
        expect(screen.getByText(/История/i)).toBeInTheDocument();
    });
});
