import { create } from "zustand";
import type { State } from "./types";
import { initialState } from "./initialState";
import { setters } from "./setters";
import { historyActions } from "./history";
import { otherActions } from "./actions";

export const useStore = create<State>((set, get) => ({
    ...initialState,
    ...setters(set),
    ...historyActions(set, get),
    ...otherActions(set),
}));
