import { describe, expect, it } from 'vitest';
import { formatDayOfYear } from '..';


describe('formatDayOfYear', () => {
    it('возвращает дату в формате "день месяц" при корректном числе', () => {
        const result = formatDayOfYear(32);
        expect(result).toMatch(/февраля/i);
    });

    it('возвращает "-" для слишком маленького значения', () => {
        expect(formatDayOfYear(0)).toBe('-');
    });

    it('возвращает "-" для слишком большого значения', () => {
        expect(formatDayOfYear(367)).toBe('-');
    });

    it('возвращает "-" при некорректных данных', () => {
        expect(formatDayOfYear(NaN)).toBe('-');
        expect(formatDayOfYear(null as unknown as number)).toBe('-');
    });
});
