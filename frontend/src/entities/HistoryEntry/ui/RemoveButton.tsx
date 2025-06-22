import styles from '../styles/index.module.css'
export function RemoveButton({ onClick }: { onClick: (e: React.MouseEvent) => void }) {
    return (
        <button className={styles.removeButton} onClick={onClick}>
            <img src="/Trash.png" alt="Удалить" />
        </button>
    );
}
