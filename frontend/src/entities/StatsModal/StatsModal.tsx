import React from "react";
import ReactDOM from "react-dom";
import { formatDayOfYear } from "../../shared/utils/validateStats";
import type { EntryType } from "../../shared/type/types";
import styles from "./index.module.css";

export function StatsModal({
    entry,
    onClose,
}: {
    entry: EntryType;
    onClose: () => void;
}) {
    if (!entry.stats) return null;

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) onClose();
    };

    return ReactDOM.createPortal(
        <>
            <div onClick={handleBackdropClick} className={styles.backdrop}>
                <div
                    className={styles.modal}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className={styles.statItem}>
                        <div className={styles.statValue}>
                            {entry.stats.total_spend_galactic}
                        </div>
                        <div className={styles.statLabel}>
                            Общие расходы в галактических кредитах
                        </div>
                    </div>
                    <div className={styles.statItem}>
                        <div className={styles.statValue}>
                            {entry.stats.rows_affected}
                        </div>
                        <div className={styles.statLabel}>Записей</div>
                    </div>
                    <div className={styles.statItem}>
                        <div className={styles.statValue}>
                            {formatDayOfYear(entry.stats.less_spent_at)}
                        </div>
                        <div className={styles.statLabel}>
                            День с мин. расходами
                        </div>
                    </div>
                    <div className={styles.statItem}>
                        <div className={styles.statValue}>
                            {formatDayOfYear(entry.stats.big_spent_at)}
                        </div>
                        <div className={styles.statLabel}>
                            День с макс. расходами
                        </div>
                    </div>
                    <div className={styles.statItem}>
                        <div className={styles.statValue}>
                            {entry.stats.less_spent_value}
                        </div>
                        <div className={styles.statLabel}>
                            Мин. сумма за день
                        </div>
                    </div>
                    <div className={styles.statItem}>
                        <div className={styles.statValue}>
                            {entry.stats.big_spent_value}
                        </div>
                        <div className={styles.statLabel}>
                            Макс. сумма за день
                        </div>
                    </div>
                    <div className={styles.statItem}>
                        <div className={styles.statValue}>
                            {entry.stats.average_spend_galactic}
                        </div>
                        <div className={styles.statLabel}>Средние расходы</div>
                    </div>
                    <div className={styles.statItem}>
                        <div className={styles.statValue}>
                            {entry.stats.big_spent_civ}
                        </div>
                        <div className={styles.statLabel}>
                            Цивилизация с макс. расходами
                        </div>
                    </div>
                    <div className={styles.statItem}>
                        <div className={styles.statValue}>
                            {entry.stats.less_spent_civ}
                        </div>
                        <div className={styles.statLabel}>
                            Цивилизация с мин. расходами
                        </div>
                    </div>
                </div>
            </div>
            <button onClick={onClose} className={styles.closeBtn}>
                X
            </button>
        </>,
        document.body
    );
}
