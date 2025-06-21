import { useGenerateReport } from "./hooks/useGenerateReport";

export function GenerateReportButton() {
    const { handleGenerate, loading, error } = useGenerateReport();

    return (
        <>
            <button onClick={handleGenerate} disabled={loading}>
                {loading ? "Генерация..." : "Начать генерацию"}
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </>
    );
}
