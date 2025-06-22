import React from 'react';
import ReactDOM from 'react-dom';
import { formatDayOfYear } from '../../shared/utils/validateStats';
import type { EntryType } from '../../shared/type/types';
import styles from './styles/index.module.css';
import { StatItem } from './ui/StatItem';
import { CloseButton } from './ui/CloseButton';

type Props = {
    entry: EntryType;
    onClose: () => void;
};

export function StatsModal({ entry, onClose }: Props) {
    if (!entry.stats) return null;

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) onClose();
    };

    const stats = entry.stats;

    return ReactDOM.createPortal(
        <div className={styles.backdrop} onClick={handleBackdropClick}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <StatItem
                    label="Общие расходы в галактических кредитах"
                    value={stats.total_spend_galactic}
                />
                <StatItem label="Записей" value={stats.rows_affected} />
                <StatItem
                    label="День с мин. расходами"
                    value={formatDayOfYear(stats.less_spent_at)}
                />
                <StatItem
                    label="День с макс. расходами"
                    value={formatDayOfYear(stats.big_spent_at)}
                />
                <StatItem label="Мин. сумма за день" value={stats.less_spent_value} />
                <StatItem label="Макс. сумма за день" value={stats.big_spent_value} />
                <StatItem label="Средние расходы" value={stats.average_spend_galactic} />
                <StatItem label="Цивилизация с макс. расходами" value={stats.big_spent_civ} />
                <StatItem label="Цивилизация с мин. расходами" value={stats.less_spent_civ} />
                <CloseButton onClick={onClose} />
            </div>
        </div>,
        document.body,
    );
}
