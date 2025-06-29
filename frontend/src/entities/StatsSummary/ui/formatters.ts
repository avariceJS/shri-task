;
import { formatDayOfYear } from '../../../shared/utils/formatDayOfYear';
import type { Stats } from '../types';

export function formatStatValue(key: keyof Stats, value: Stats[keyof Stats]) {
    switch (key) {
        case 'big_spent_at':
        case 'less_spent_at':
            return formatDayOfYear(value as number);
        default:
            return value;
    }
}
