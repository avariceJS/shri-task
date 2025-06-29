import { describe, expect, it } from 'vitest';
import { isValidStats } from '..';

describe('isValidStats', () => {
    it('возвращает true для корректных данных', () => {
        const valid = {
            total_spend_galactic: 100,
            rows_affected: 50,
            less_spent_at: 12,
            big_spent_at: 42,
            less_spent_value: 10,
            big_spent_value: 200,
            average_spend_galactic: 50,
            big_spent_civ: 'Mars',
            less_spent_civ: 'Venus',
        };

        expect(isValidStats(valid)).toBe(true);
    });

    it('возвращает false, если отсутствует обязательное число', () => {
        const invalid = {
            ...{
                total_spend_galactic: 100,
                rows_affected: 50,
                less_spent_at: 12,
                big_spent_at: 42,
                less_spent_value: 10,
                big_spent_value: 200,
                average_spend_galactic: 50,
                big_spent_civ: 'Mars',
                less_spent_civ: 'Venus',
            },
            total_spend_galactic: null,
        };

        expect(isValidStats(invalid)).toBe(false);
    });

    it('возвращает false, если civ строки пустые', () => {
        const invalid = {
            total_spend_galactic: 100,
            rows_affected: 50,
            less_spent_at: 12,
            big_spent_at: 42,
            less_spent_value: 10,
            big_spent_value: 200,
            average_spend_galactic: 50,
            big_spent_civ: '',
            less_spent_civ: '',
        };

        expect(isValidStats(invalid)).toBe(false);
    });
});
