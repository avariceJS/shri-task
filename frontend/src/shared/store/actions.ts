import type { SetState, State } from "./types";

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
});
