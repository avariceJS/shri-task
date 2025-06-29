import { describe, it, expect, vi } from 'vitest';
import { otherActions } from '../actions';

describe('store/actions', () => {
    const set = vi.fn();
    const actions = otherActions(set);

    it('clearFile сбрасывает состояние файла', () => {
        actions.clearFile();
        expect(set).toHaveBeenCalledWith({
            file: null,
            stats: [],
            error: null,
            isParsing: false,
            isParsed: false,
        });
    });

    it('resetReportState сбрасывает состояние генерации отчета', () => {
        actions.resetReportState();
        expect(set).toHaveBeenCalledWith({
            isGenerating: false,
            isGenerated: false,
            generatedFile: null,
            error: null,
        });
    });
});
