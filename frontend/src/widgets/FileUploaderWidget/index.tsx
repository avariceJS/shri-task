import { FileInfo } from "../../entities/FileInfo";
import { StatsSummary } from "../../entities/StatsSummary";
import { useFileUploader } from "../../features/hooks/useFileUploader";
import { FileDropZone } from "../../features/FileDropZone";

export function FileUploaderWidget() {
    const {
        file,
        loading,
        error,
        dragActive,
        latestStats,
        handleFileSelected,
        handleSendFile,
        handleDragOver,
        handleDragLeave,
        handleDrop,
        clearFile,
    } = useFileUploader();

    return (
        <>
            <FileDropZone
                dragActive={dragActive}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                {file ? (
                    <FileInfo
                        file={file}
                        onClear={clearFile}
                        loading={loading}
                    />
                ) : (
                    <p>или перетащите сюда</p>
                )}
            </FileDropZone>

            {!file && (
                <input
                    type="file"
                    accept=".csv"
                    onChange={(e) =>
                        handleFileSelected(e.target.files?.[0] ?? null)
                    }
                    disabled={loading}
                />
            )}

            {error && <p style={{ color: "red" }}>{error}</p>}

            {file && (
                <button onClick={handleSendFile} disabled={loading}>
                    {loading ? "Ожидание ответа..." : "Отправить файл"}
                </button>
            )}

            {latestStats && <StatsSummary stats={latestStats} />}
        </>
    );
}
