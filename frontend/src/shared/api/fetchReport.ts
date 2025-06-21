export async function fetchReport(params: {
    size: string;
    withErrors: string;
    maxSpend: string;
}): Promise<Blob> {
    const API_URL = "http://localhost:3000/report";

    const query = new URLSearchParams(params).toString();
    const response = await fetch(`${API_URL}?${query}`);

    if (!response.ok) throw new Error("Ошибка при генерации отчета");

    return await response.blob();
}
