import type { EntryType, StatsEntry } from '../../../shared/type/types';

export function createHistoryEntry(
    filename: string,
    parsedStats: StatsEntry[],
    latestValid: StatsEntry | null,
    hadParsingError: boolean,
): EntryType {
    return {
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        filename,
        status: latestValid && !hadParsingError ? 'success' : 'error',
        stats: latestValid ??
            parsedStats[0] ?? {
                total_spend_galactic: 0,
                rows_affected: 0,
                less_spent_at: 0,
                big_spent_at: 0,
                less_spent_value: 0,
                big_spent_value: 0,
                average_spend_galactic: 0,
                big_spent_civ: '',
                less_spent_civ: '',
            },
    };
}
