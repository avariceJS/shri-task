import styles from '../styles/index.module.css';

export function StatusIndicator({ status }: { status: string }) {
    const isError = status === 'error';
    const isSuccess = status === 'success';

    return (
        <>
            <p className={`${styles.success} ${!isSuccess ? styles.dimmed : ''}`}>
                Обработан успешно <img src="/Smaile.png" alt="ok" />
            </p>
            <p className={`${styles.error} ${!isError ? styles.dimmed : ''}`}>
                Не удалось обработать <img src="/ph_smiley-sad.png" alt="error" />
            </p>
        </>
    );
}
