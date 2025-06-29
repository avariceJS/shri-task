import type { EntryType, StatsEntry } from '../../../shared/type/types';
import { parseStatsStream } from '../../../shared/utils/parseStatsStream';
import { isValidStats } from '../../../shared/utils/isValidStats';
import { createHistoryEntry } from './createHistoryEntry';

export async function uploadFile(
    url: string,
    file: File,
    onParsed: (parsed: StatsEntry[]) => void,
): Promise<{
    result: EntryType;
    latestValid: StatsEntry | null;
    hadParsingError: boolean;
}> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(url, {
        method: 'POST',
        body: formData,
    });

    if (!response.ok || !response.body) {
        throw new Error('Ошибка при получении данных от сервера');
    }

    const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();

    const parsedStats: StatsEntry[] = [];
    const { hadParsingError } = await parseStatsStream(reader, (parsed) => {
        parsedStats.push(parsed);
        onParsed(parsedStats);
    });

    const latestValid = [...parsedStats].reverse().find(isValidStats) ?? null;

    const result = createHistoryEntry(file.name, parsedStats, latestValid, hadParsingError);

    return { result, latestValid, hadParsingError };
}
