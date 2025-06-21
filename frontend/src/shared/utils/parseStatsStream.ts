export async function parseStatsStream(reader: ReadableStreamDefaultReader) {
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
                    parsedStats.push(JSON.parse(line));
                } catch {
                    hadParsingError = true;
                }
            }
        }
    }

    return { parsedStats, hadParsingError };
}
