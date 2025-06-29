import { useEffect } from 'react';
import { StatsModal } from '../../entities/StatsModal';
import { useStore } from '../../shared/store/useStore';
import { HistoryEntry } from '../../entities/HistoryEntry';
import { Button } from '../../shared/components/Button';
import styles from './index.module.css';
import { useNavigate } from 'react-router-dom';

export function UploadHistoryWidget() {
    const {
        uploadHistory,
        removeFromHistory,
        clearHistory,
        loadHistoryFromStorage,
        selectedEntry,
        setSelectedEntry,
        visibleCount,
        setVisibleCount,
    } = useStore();
    const navigate = useNavigate();
    useEffect(() => {
        loadHistoryFromStorage();
    }, [loadHistoryFromStorage]);

    if (uploadHistory.length === 0) {
        return <p className={styles.historyText}>История пуста</p>;
    }

    const visibleHistory = uploadHistory.slice(0, visibleCount);
    const hasMore = visibleCount < uploadHistory.length;

    return (
        <>
            <ul>
                <h2 className={styles.text}>История загрузок</h2>
                {visibleHistory.map((entry) => (
                    <HistoryEntry
                        key={entry.id}
                        entry={entry}
                        onSelect={setSelectedEntry}
                        onRemove={removeFromHistory}
                    />
                ))}
            </ul>
            
            <div className={styles.buttonsWrapper}>
                <Button variant="active" onClick={() => navigate('/generate')}>
                    Сгенерировать больше
                </Button>
                <Button variant="clear" onClick={clearHistory}>
                    Очистить всё
                </Button>

                {hasMore && (
                    <Button variant="active" onClick={() => setVisibleCount(visibleCount + 4)}>
                        Показать больше записей
                    </Button>
                )}
            </div>

            {selectedEntry && (
                <StatsModal entry={selectedEntry} onClose={() => setSelectedEntry(null)} />
            )}
        </>
    );
}
