import styles from '../styles/index.module.css';
export function FileName({ name }: { name: string }) {
    return <div className={styles.fileName}>{name}</div>;
}
