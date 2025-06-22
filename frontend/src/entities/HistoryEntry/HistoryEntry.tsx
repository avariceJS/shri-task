import React from "react";

import styles from "./index.module.css";
import type { UploadHistoryEntry } from "../../shared/type/types";

type Props = {
    entry: UploadHistoryEntry;
    onSelect: (entry: UploadHistoryEntry) => void;
    onRemove: (id: string) => void;
};

export function HistoryEntry({ entry, onSelect, onRemove }: Props) {
    const handleClick = () => {
        if (entry.status === "success" && entry.stats) {
            onSelect(entry);
        }
    };

    const handleRemoveClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onRemove(entry.id);
    };

    const isError = entry.status === "error";

    return (
        <li
            className={styles.container}
            onClick={handleClick}
            data-testid="history-entry"
        >
            <div className={styles.content}>
                <div className={styles.leftSection}>
                    <img src="/akar-icons_file.png" alt="Файл" />
                    <div className={styles.fileName}>{entry.filename}</div>
                    <strong className={styles.date}>
                        {new Date(entry.createdAt).toLocaleDateString()}
                    </strong>
                    <p className={isError ? styles.dimmed : styles.success}>
                        Обработан успешно
                        <img src="/Smaile.png" alt="" />
                    </p>
                    <p className={isError ? styles.error : styles.dimmed}>
                        Не удалось обработать
                        <img src="/ph_smiley-sad.png" alt="" />
                    </p>
                </div>
            </div>

            <button className={styles.removeButton} onClick={handleRemoveClick}>
                <img src="/Trash.png" alt="Удалить" />
            </button>
        </li>
    );
}
