import { useStore } from "../../../shared/store/useStore";
import { fetchReport } from "../../../shared/api/fetchReport";

export function useGenerateReport() {
    const {
        setLoading,
        setError,
        isGenerating,
        isGenerated,
        generatedFile,
        setIsGenerating,
        setIsGenerated,
        setGeneratedFile,
    } = useStore();

    const handleGenerate = async () => {
        setLoading(true);
        setError(null);
        setIsGenerating(true);
        setIsGenerated(false);
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
            const message =
                err instanceof Error ? err.message : "Неизвестная ошибка";
            setError(message);
        } finally {
            setLoading(false);
            setIsGenerating(false);
        }
    };

    return {
        handleGenerate,
        isGenerating,
        isGenerated,
        generatedFile,
    };
}
