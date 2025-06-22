import styles from '../styles/index.module.css';
export function DateDisplay({ date }: { date: string }) {
    const formatted = new Date(date).toLocaleDateString();
    return <strong className={styles.date}>{formatted}</strong>;
}
