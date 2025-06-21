import { formatDayOfYear } from "../shared/utils/validateStats";

type Stats = {
    total_spend_galactic: number;
    rows_affected: number;
    less_spent_at: number;
    big_spent_civ: string;
    less_spent_civ: string;
    big_spent_at: number;
    big_spent_value: number;
    average_spend_galactic: number;
};

type Props = {
    stats: Stats;
};

export function StatsSummary({ stats }: Props) {
    return (
        <div style={{ marginTop: 20 }}>
            <h2>Результаты агрегации:</h2>
            <ul>
                <li>Общие расходы: {stats.total_spend_galactic}</li>
                <li>Обработано записей: {stats.rows_affected}</li>
                <li>
                    День с мин. расходами:{" "}
                    {formatDayOfYear(stats.less_spent_at)}
                </li>
                <li>Цивилизация с макс. расходами: {stats.big_spent_civ}</li>
                <li>Цивилизация с мин. расходами: {stats.less_spent_civ}</li>
                <li>
                    День с макс. расходами:{" "}
                    {formatDayOfYear(stats.big_spent_at)}
                </li>
                <li>Макс. сумма за день: {stats.big_spent_value}</li>
                <li>Средние расходы: {stats.average_spend_galactic}</li>
            </ul>
        </div>
    );
}
