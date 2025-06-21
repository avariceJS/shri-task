import React from "react";
import ReactDOM from "react-dom";
import { formatDayOfYear } from "../shared/utils/validateStats";
import type { EntryType } from "../shared/type/types";

export function StatsModal({
    entry,
    onClose,
}: {
    entry: EntryType;
    onClose: () => void;
}) {
    if (!entry.stats) return null;

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) onClose();
    };

    return ReactDOM.createPortal(
        <div
            onClick={handleBackdropClick}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                backgroundColor: "rgba(0,0,0,0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 999,
            }}
        >
            <div
                style={{
                    backgroundColor: "white",
                    padding: 20,
                    borderRadius: 10,
                    minWidth: 300,
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <ul>
                    <li>Общие расходы: {entry.stats.total_spend_galactic}</li>
                    <li>Записей: {entry.stats.rows_affected}</li>
                    <li>
                        День с мин. расходами:{" "}
                        {formatDayOfYear(entry.stats.less_spent_at)}
                    </li>
                    <li>
                        День с макс. расходами:{" "}
                        {formatDayOfYear(entry.stats.big_spent_at)}
                    </li>
                    <li>Мин. сумма за день: {entry.stats.less_spent_value}</li>
                    <li>Макс. сумма за день: {entry.stats.big_spent_value}</li>
                    <li>
                        Средние расходы: {entry.stats.average_spend_galactic}
                    </li>
                    <li>
                        Цивилизация с макс. расходами:{" "}
                        {entry.stats.big_spent_civ}
                    </li>
                    <li>
                        Цивилизация с мин. расходами:{" "}
                        {entry.stats.less_spent_civ}
                    </li>
                </ul>
                <button onClick={onClose}>Закрыть</button>
            </div>
        </div>,
        document.body
    );
}
