import type { SetState, State } from './types';

export const otherActions = (set: SetState<State>) => ({
    clearFile: () => {
        set({
            file: null,
            stats: [],
            error: null,
            isParsing: false,
            isParsed: false,
        });
    },
    resetReportState: () => {
        set({
            isGenerating: false,
            isGenerated: false,
            generatedFile: null,
            error: null,
        });
    },
});
