export type StatsEntry = {
    total_spend_galactic: number;
    rows_affected: number;
    less_spent_at: number;
    big_spent_at: number;
    less_spent_value: number;
    big_spent_value: number;
    average_spend_galactic: number;
    big_spent_civ: string;
    less_spent_civ: string;
};

export type UploadHistoryEntry = {
    id: string;
    createdAt: string;
    filename: string;
    status: "success" | "error";
    stats?: StatsEntry;
};

export type EntryType = {
    id: string;
    createdAt: string;
    filename: string;
    status: "success" | "error";
    stats?: StatsEntry;
};
