import { useStore } from "../../../shared/store/useStore";
import { fetchReport } from "../../../shared/api/fetchReport";
import { useState } from "react";

export function useGenerateReport() {
    const { setLoading, setError } = useStore();

    const [isGenerating, setIsGenerating] = useState(false);
    const [isGenerated, setIsGenerated] = useState(false);
    const [error, setLocalError] = useState<string | null>(null);
    const [generatedFile, setGeneratedFile] = useState<File | null>(null);

    const handleGenerate = async () => {
        setLoading(true);
        setError(null);
        setIsGenerating(true);
        setIsGenerated(false);
        setLocalError(null);
        setGeneratedFile(null);

        try {
            const blob = await fetchReport({
                size: "0.01",
                withErrors: "off",
                maxSpend: "1000",
            });

            const file = new File([blob], "report.csv", { type: "text/csv" });
            setGeneratedFile(file);

            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = "report.csv";
            link.click();
            URL.revokeObjectURL(url);

            setIsGenerated(true);
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Неизвестная ошибка";
            setError(message);
            setLocalError("упс, не то...");
        } finally {
            setLoading(false);
            setIsGenerating(false);
        }
    };

    return {
        handleGenerate,
        isGenerating,
        isGenerated,
        error: error || undefined,
        generatedFile,
    };
}
