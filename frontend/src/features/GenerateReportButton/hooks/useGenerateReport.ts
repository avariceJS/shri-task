import { useStore } from "../../../shared/store/useStore";
import { fetchReport } from "../../../shared/api/fetchReport";

export function useGenerateReport() {
    const { loading, error, setLoading, setError } = useStore();

    const handleGenerate = async () => {
        setLoading(true);
        setError(null);

        try {
            const blob = await fetchReport({
                size: "0.000001",
                withErrors: "off",
                maxSpend: "1000",
            });

            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = "report.csv";
            link.click();
            URL.revokeObjectURL(url);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Неизвестная ошибка");
        } finally {
            setLoading(false);
        }
    };

    return { handleGenerate, loading, error };
}
