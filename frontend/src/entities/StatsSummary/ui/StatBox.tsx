import styles from '../styles/index.module.css';
export function StatBox({ label, value }: { label: string; value: string | number }) {
    return (
        <div className={styles.box}>
            <div className={styles.value}>{value}</div>
            <div className={styles.label}>{label}</div>
        </div>
    );
}
