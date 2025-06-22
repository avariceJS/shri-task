import styles from '../styles/index.module.css';

export function CloseButton({ onClick }: { onClick: () => void }) {
    return (
        <button onClick={onClick} className={styles.closeBtn}>
            X
        </button>
    );
}
