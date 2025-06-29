import { act, renderHook } from '@testing-library/react';
import { useFileUploader } from '../useFileUploader';
import { vi } from 'vitest';

const setFile = vi.fn();
const setError = vi.fn();

vi.mock('../../../shared/store/useStore', async () => {
    const actual = await vi.importActual<typeof import('../../../shared/store/useStore')>(
        '../../../shared/store/useStore',
    );
    return {
        ...actual,
        useStore: vi.fn(() => ({
            file: null,
            setFile,
            setError,
            setLoading: vi.fn(),
            setStats: vi.fn(),
            setIsParsing: vi.fn(),
            setIsParsed: vi.fn(),
            dragActive: false,
            setDragActive: vi.fn(),
            addToHistory: vi.fn(),
            clearFile: vi.fn(),
            loading: false,
            error: null,
            stats: [],
            isParsing: false,
            isParsed: false,
        })),
    };
});

describe('useFileUploader', () => {
    it('должен вернуть объект с нужными полями и функциями', () => {
        beforeEach(() => {
            setFile.mockClear();
            setError.mockClear();
        });

        const { result } = renderHook(() => useFileUploader());

        expect(result.current).toHaveProperty('handleFileSelected');
        expect(result.current).toHaveProperty('handleSendFile');
        expect(result.current).toHaveProperty('handleDragOver');
        expect(result.current).toHaveProperty('handleDragLeave');
        expect(result.current).toHaveProperty('handleDrop');
        expect(typeof result.current.handleFileSelected).toBe('function');
    });

    it('handleFileSelected не вызывает setFile при неверном типе файла', () => {
        const { result } = renderHook(() => useFileUploader());

        const file = new File(['wrong'], 'data.txt', { type: 'text/plain' });
        act(() => {
            result.current.handleFileSelected(file);
        });

        expect(setFile).not.toHaveBeenCalled();
        expect(setError).toHaveBeenCalledWith('упс, не то...');
    });

    it('handleFileSelected не вызывает setFile при пустом файле', () => {
        const { result } = renderHook(() => useFileUploader());

        const emptyFile = new File([], 'empty.csv', { type: 'text/csv' });
        act(() => {
            result.current.handleFileSelected(emptyFile);
        });

        expect(setFile).not.toHaveBeenCalled();
        expect(setError).toHaveBeenCalledWith('упс, не то...');
    });
});
