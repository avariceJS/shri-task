import { useEffect, useState } from "react";
import { StatsModal } from "../../entities/StatsModal";
import { useStore } from "../../shared/store/useStore";
import type { UploadHistoryEntry } from "../../shared/type/types";
import { HistoryEntry } from "../../entities/HistoryEntry";

export function UploadHistoryWidget() {
    const {
        uploadHistory,
        removeFromHistory,
        clearHistory,
        loadHistoryFromStorage,
    } = useStore();
    const [selectedEntry, setSelectedEntry] =
        useState<UploadHistoryEntry | null>(null);

    useEffect(() => {
        loadHistoryFromStorage();
    }, [loadHistoryFromStorage]);

    if (uploadHistory.length === 0) {
        return <p>История пуста</p>;
    }

    return (
        <>
            <ul>
                {uploadHistory.map((entry) => (
                    <HistoryEntry
                        key={entry.id}
                        entry={entry}
                        onSelect={setSelectedEntry}
                        onRemove={removeFromHistory}
                    />
                ))}
            </ul>
            <button onClick={clearHistory} style={{ marginTop: 10 }}>
                Очистить всю историю
            </button>

            {selectedEntry && (
                <StatsModal
                    entry={selectedEntry}
                    onClose={() => setSelectedEntry(null)}
                />
            )}
        </>
    );
}
