import type { FC } from 'react';
import type { FileDropZoneProps } from './types';
import styles from './styles/index.module.css';

export const FileDropZone: FC<FileDropZoneProps> = ({
    onDragOver,
    onDragLeave,
    onDrop,
    children,
}) => (
    <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={styles.container}
    >
        {children}
    </div>
);
