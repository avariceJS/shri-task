import { describe, expect, it, vi } from 'vitest';
import { fetchReport } from '../api/fetchReport';
import type { Mock } from 'vitest';

describe('fetchReport', () => {
    const mockBlob = new Blob(['csv-data']);
    const originalFetch = global.fetch;

    beforeEach(() => {
        global.fetch = vi.fn();
    });

    afterEach(() => {
        global.fetch = originalFetch;
    });

    it('должен возвращать Blob при успешном запросе', async () => {
        (global.fetch as Mock).mockResolvedValue({
            ok: true,
            blob: () => Promise.resolve(mockBlob),
        });

        const result = await fetchReport({
            size: '1000',
            withErrors: 'false',
            maxSpend: '1000',
        });

        expect(result).toEqual(mockBlob);
        expect(global.fetch).toHaveBeenCalledWith(
            'http://localhost:3000/report?size=1000&withErrors=false&maxSpend=1000',
        );
    });

    it('должен выбрасывать ошибку при неудачном ответе сервера', async () => {
        (global.fetch as Mock).mockResolvedValue({
            ok: false,
        });

        await expect(
            fetchReport({
                size: '1000',
                withErrors: 'true',
                maxSpend: '5000',
            }),
        ).rejects.toThrow('Ошибка при генерации отчета');
    });
});
