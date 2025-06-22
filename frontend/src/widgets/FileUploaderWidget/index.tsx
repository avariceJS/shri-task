import { useRef } from "react";
import { FileInfo } from "../../entities/FileInfo/FileInfo";
import { StatsSummary } from "../../entities/StatsSummary/StatsSummary";
import { useFileUploader } from "../../features/hooks/useFileUploader";
import { FileDropZone } from "../../features/FileDropZone";
import { ButtonUpload } from "../../shared/components/ButtonUpload";
import { Button } from "../../shared/components/Button";
import Spinner from "../../shared/components/Spinner";
import styles from "./index.module.css";

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
        isParsing,
        isParsed,
    } = useFileUploader();

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleUploadButtonClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className={styles.container}>
            <h2>
                Загрузите csv файл и получите полную информацию о нём за
                сверхнизкое время
            </h2>
            <FileDropZone
                dragActive={dragActive}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <div
                    className={`${styles.dropZone} ${
                        file || isParsing || isParsed
                            ? styles.dropZoneActive
                            : ""
                    } ${dragActive ? styles.dragActive : ""}`}
                >
                    {loading && isParsing ? (
                        <>
                            <ButtonUpload variant="parsing" disabled>
                                <Spinner />
                            </ButtonUpload>
                            <p className={styles.title}>идёт парсинг файла</p>
                        </>
                    ) : file ? (
                        <>
                            <div className={styles.fileInfoRow}>
                                <FileInfo
                                    children={file.name}
                                    onClear={clearFile}
                                    loading={loading}
                                    isParsed={isParsed}
                                    error={error}
                                />
                            </div>

                            {!error && (
                                <p className={styles.title}>
                                    {isParsed ? "готово." : "файл загружен!"}
                                </p>
                            )}
                            {error && (
                                <p className={styles.errorText}>{error}</p>
                            )}
                        </>
                    ) : (
                        <>
                            <ButtonUpload
                                variant="active"
                                onClick={handleUploadButtonClick}
                                disabled={loading}
                            >
                                Загрузить файл
                            </ButtonUpload>
                            <p className={styles.title}>или перетащите сюда</p>
                        </>
                    )}
                </div>
            </FileDropZone>

            <input
                className={styles.input}
                ref={fileInputRef}
                type="file"
                accept=".csv"
                onChange={(e) =>
                    handleFileSelected(e.target.files?.[0] ?? null)
                }
                disabled={loading}
            />

            {!isParsed && !isParsing && !error && (
                <div className={styles.buttonContainer}>
                    <Button
                        variant={file ? "active" : "unactive"}
                        onClick={handleSendFile}
                        disabled={!file || loading}
                    >
                        {loading ? <Spinner /> : "Отправить"}
                    </Button>
                </div>
            )}

            {latestStats && !error && <StatsSummary stats={latestStats} />}
        </div>
    );
}
