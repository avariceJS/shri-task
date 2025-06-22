export type Stats = {
    total_spend_galactic: number;
    rows_affected: number;
    less_spent_at: number;
    big_spent_civ: string;
    less_spent_civ: string;
    big_spent_at: number;
    big_spent_value: number;
    average_spend_galactic: number;
};

export type Props = {
    stats: Stats;
};

export type StatDefinition = {
    label: string;
    value: string | number;
};
