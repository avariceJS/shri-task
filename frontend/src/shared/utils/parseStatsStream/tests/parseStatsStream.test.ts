import { describe, expect, it, vi } from 'vitest';
import { parseStatsStream } from '..';

function createMockStream(data: string[]) {
    let index = 0;
    return new ReadableStream({
        pull(controller) {
            if (index < data.length) {
                controller.enqueue(data[index]);
                index++;
            } else {
                controller.close();
            }
        },
    });
}

describe('parseStatsStream', () => {
    it('парсит корректные JSON строки и вызывает onStatParsed', async () => {
        const mockData = ['{"id":1}\n{"id":2}\n'];
        const stream = createMockStream(mockData);
        const reader = stream.getReader();

        const onStatParsed = vi.fn();
        const result = await parseStatsStream(reader, onStatParsed);

        expect(result.parsedStats).toEqual([{ id: 1 }, { id: 2 }]);
        expect(result.hadParsingError).toBe(false);
        expect(onStatParsed).toHaveBeenCalledTimes(2);
    });

    it('устанавливает hadParsingError, если JSON некорректный в нескольких chunkах', async () => {
        const mockData = ['{"id":1}\n{"id":2\n'];
        const stream = createMockStream(mockData);
        const reader = stream.getReader();

        const onStatParsed = vi.fn();
        const result = await parseStatsStream(reader, onStatParsed);

        expect(result.parsedStats).toEqual([{ id: 1 }]);
        expect(result.hadParsingError).toBe(true);
    });

    it('устанавливает флаг ошибки при битом JSON в одном большом chunk', async () => {
        const brokenJson = `{"ok":true}\n{not valid json}\n`;
        const stream = new ReadableStream({
            start(controller) {
                controller.enqueue(brokenJson);
                controller.close();
            },
        });

        const reader = stream.getReader();
        const result = await parseStatsStream(reader);
        expect(result.hadParsingError).toBe(true);
    });

    it('работает без onStatParsed', async () => {
        const mockData = ['{"value":42}\n'];
        const stream = createMockStream(mockData);
        const reader = stream.getReader();

        const result = await parseStatsStream(reader);

        expect(result.parsedStats).toEqual([{ value: 42 }]);
        expect(result.hadParsingError).toBe(false);
    });

    it('возвращает пустой массив, если поток пустой', async () => {
        const stream = new ReadableStream({
            start(controller) {
                controller.close();
            },
        });

        const reader = stream.getReader();
        const result = await parseStatsStream(reader);
        expect(result.parsedStats).toEqual([]);
        expect(result.hadParsingError).toBe(false);
    });
});
