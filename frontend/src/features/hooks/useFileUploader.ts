import { useState } from "react";
import { parseStatsStream } from "../../shared/utils/parseStatsStream";
import { useStore } from "../../shared/store/useStore";
import { isValidStats } from "../../shared/utils/validateStats";
import type { EntryType } from "../../shared/type/types";

const API_URL = "http://localhost:3000/aggregate?rows=100";

export function useFileUploader() {
    const {
        file,
        setFile,
        loading,
        setLoading,
        error,
        setError,
        stats,
        setStats,
        addToHistory,
    } = useStore();

    const [dragActive, setDragActive] = useState(false);
    const [isParsing, setIsParsing] = useState(false);
    const [isParsed, setIsParsed] = useState(false);

    const clearFile = () => {
        setFile(null);
        setStats([]);
        setError(null);
        setIsParsing(false);
        setIsParsed(false);
    };

    const handleFileSelected = (selectedFile: File | null) => {
        clearFile();

        if (!selectedFile) return;

        if (!selectedFile.name.endsWith(".csv")) {
            setError("упс, не то...");
            return;
        }

        setFile(selectedFile);
        setError(null);
    };

    const handleSendFile = async () => {
        if (!file) return;

        setLoading(true);
        setIsParsing(true);
        setIsParsed(false);
        setError(null);
        setStats([]);

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                body: formData,
            });

            if (!response.ok || !response.body) {
                throw new Error("Ошибка при получении данных от сервера");
            }

            const reader = response.body
                .pipeThrough(new TextDecoderStream())
                .getReader();

            const parsedStats: any[] = [];
            const { hadParsingError } = await parseStatsStream(
                reader,
                (parsed) => {
                    parsedStats.push(parsed);
                    setStats([...parsedStats]);
                }
            );

            if (parsedStats.length > 0) {
                const latestValid = [...parsedStats]
                    .reverse()
                    .find(isValidStats);

                const entry: EntryType = {
                    id: Date.now().toString(),
                    createdAt: new Date().toISOString(),
                    filename: file.name,
                    status:
                        latestValid && !hadParsingError ? "success" : "error",
                    stats: latestValid ?? parsedStats[0],
                };

                addToHistory(entry);

                if (!latestValid) {
                    setError("упс, не то...");
                    setIsParsed(false);
                } else {
                    setIsParsed(true);
                }
            } else {
                setError("упс, не то...");
                setIsParsed(false);

                addToHistory({
                    id: Date.now().toString(),
                    createdAt: new Date().toISOString(),
                    filename: file.name,
                    status: "error",
                    stats: {
                        total_spend_galactic: 0,
                        rows_affected: 0,
                        less_spent_at: 0,
                        big_spent_at: 0,
                        less_spent_value: 0,
                        big_spent_value: 0,
                        average_spend_galactic: 0,
                        big_spent_civ: "",
                        less_spent_civ: "",
                    },
                });
            }
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Неизвестная ошибка");
            setIsParsed(false);
        } finally {
            setLoading(false);
            setIsParsing(false);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragActive(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragActive(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragActive(false);
        if (e.dataTransfer.files.length > 0) {
            handleFileSelected(e.dataTransfer.files[0]);
        }
    };

    const latestStats = stats.length > 0 ? stats[stats.length - 1] : undefined;

    return {
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
    };
}
