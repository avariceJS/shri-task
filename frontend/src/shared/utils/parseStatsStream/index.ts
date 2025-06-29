export async function parseStatsStream(
    reader: ReadableStreamDefaultReader<string>,
    onStatParsed?: (stat: any) => void
): Promise<{ parsedStats: any[]; hadParsingError: boolean }> {
    let resultText = "";
    const parsedStats: any[] = [];
    let hadParsingError = false;

    while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        resultText += value;
        const boundary = resultText.lastIndexOf("\n");

        if (boundary !== -1) {
            const lines = resultText.slice(0, boundary).split("\n");
            resultText = resultText.slice(boundary + 1);

            for (const line of lines) {
                try {
                    const parsed = JSON.parse(line);
                    parsedStats.push(parsed);
                    onStatParsed?.(parsed);
                } catch {
                    hadParsingError = true;
                }
            }
        }
    }

    return { parsedStats, hadParsingError };
}
