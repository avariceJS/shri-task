import styles from '../styles/index.module.css';

type StatItemProps = {
    label: string;
    value: string | number;
};

export function StatItem({ label, value }: StatItemProps) {
    return (
        <div className={styles.statItem}>
            <div className={styles.statValue}>{value}</div>
            <div className={styles.statLabel}>{label}</div>
        </div>
    );
}
