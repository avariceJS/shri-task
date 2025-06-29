import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Spinner from '..';
import styles from '../Spinner.module.css';

describe('Spinner', () => {
    it('рендерит контейнер спиннера', () => {
        const { container } = render(<Spinner />);
        expect(container.firstChild).toHaveClass(styles.spinner);
    });
});
