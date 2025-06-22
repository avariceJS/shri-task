import type { StatDefinition, Stats } from '../types';
import { formatStatValue } from './formatters';

export function getStatList(stats: Stats): StatDefinition[] {
    return [
        { label: 'общие расходы в галактических кредитах', value: stats.total_spend_galactic },
        { label: 'цивилизация с минимальными расходами', value: stats.less_spent_civ },
        { label: 'количество обработанных записей', value: stats.rows_affected },
        {
            label: 'день года с максимальными расходами',
            value: formatStatValue('big_spent_at', stats.big_spent_at),
        },
        {
            label: 'день года с минимальными расходами',
            value: formatStatValue('less_spent_at', stats.less_spent_at),
        },
        { label: 'максимальная сумма расходов за день', value: stats.big_spent_value },
        { label: 'цивилизация с максимальными расходами', value: stats.big_spent_civ },
        { label: 'средние расходы в галактических кредитах', value: stats.average_spend_galactic },
    ];
}
