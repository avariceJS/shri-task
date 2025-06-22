import React from 'react';
import styles from './styles/index.module.css';
import type { UploadHistoryEntry } from '../../shared/type/types';
import { FileIcon } from './ui/FileIcon';
import { FileName } from './ui/FileName';
import { DateDisplay } from './ui/DateDisplay';
import { StatusIndicator } from './ui/StatusIndicator';
import { RemoveButton } from './ui/RemoveButton';

type Props = {
    entry: UploadHistoryEntry;
    onSelect: (entry: UploadHistoryEntry) => void;
    onRemove: (id: string) => void;
};

export function HistoryEntry({ entry, onSelect, onRemove }: Props) {
    const handleClick = () => {
        if (entry.status === 'success' && entry.stats) {
            onSelect(entry);
        }
    };

    const handleRemoveClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onRemove(entry.id);
    };

    return (
        <li className={styles.container} onClick={handleClick} data-testid="history-entry">
            <div className={styles.content}>
                <div className={styles.leftSection}>
                    <FileIcon />
                    <FileName name={entry.filename} />
                    <DateDisplay date={entry.createdAt} />
                    <StatusIndicator status={entry.status} />
                </div>
            </div>
            <RemoveButton onClick={handleRemoveClick} />
        </li>
    );
}
