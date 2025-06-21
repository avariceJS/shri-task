import React from "react";
import type { UploadHistoryEntry } from "../shared/type/types";

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

    const successStyle = {
        opacity: entry.status === "error" ? 0.6 : 1,
        color: entry.status === "error" ? "#555" : "black",
        marginRight: "15px",
    };

    const errorStyle = {
        opacity: entry.status === "error" ? 1 : 0.5,
        color: entry.status === "error" ? "black" : "#555",
    };

    return (
        <li
            style={{ marginBottom: 16, cursor: "pointer" }}
            onClick={handleClick}
            data-testid="history-entry"
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",
                    width: "50%",
                }}
            >
                <div>{entry.filename}</div>
                <strong>{new Date(entry.createdAt).toLocaleString()}</strong>
                <div style={{ display: "flex" }}>
                    <p style={successStyle}>Обработан успешно</p>
                    <p style={errorStyle}>Не удалось обработать</p>
                </div>
                <button onClick={handleRemoveClick}>Удалить</button>
            </div>
        </li>
    );
}
