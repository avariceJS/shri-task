import { formatDayOfYear } from "../../shared/utils/validateStats";
import styles from "./index.module.css";

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
        <div className={styles.container}>
            <div className={styles.grid}>
                <div className={styles.box}>
                    <div className={styles.value}>
                        {stats.total_spend_galactic}
                    </div>
                    <div className={styles.label}>
                        общие расходы в галактических кредитах
                    </div>
                </div>
                <div className={styles.box}>
                    <div className={styles.value}>{stats.less_spent_civ}</div>
                    <div className={styles.label}>
                        цивилизация с минимальными расходами
                    </div>
                </div>
                <div className={styles.box}>
                    <div className={styles.value}>{stats.rows_affected}</div>
                    <div className={styles.label}>
                        количество обработанных записей
                    </div>
                </div>
                <div className={styles.box}>
                    <div className={styles.value}>
                        {formatDayOfYear(stats.big_spent_at)}
                    </div>
                    <div className={styles.label}>
                        день года с максимальными расходами
                    </div>
                </div>
                <div className={styles.box}>
                    <div className={styles.value}>
                        {formatDayOfYear(stats.less_spent_at)}
                    </div>
                    <div className={styles.label}>
                        день года с минимальными расходами
                    </div>
                </div>
                <div className={styles.box}>
                    <div className={styles.value}>{stats.big_spent_value}</div>
                    <div className={styles.label}>
                        максимальная сумма расходов за день
                    </div>
                </div>
                <div className={styles.box}>
                    <div className={styles.value}>{stats.big_spent_civ}</div>
                    <div className={styles.label}>
                        цивилизация с максимальными расходами
                    </div>
                </div>
                <div className={styles.box}>
                    <div className={styles.value}>
                        {stats.average_spend_galactic}
                    </div>
                    <div className={styles.label}>
                        средние расходы в галактических кредитах
                    </div>
                </div>
            </div>
        </div>
    );
}
