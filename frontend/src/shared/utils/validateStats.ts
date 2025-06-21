import type { StatsEntry } from "../type/types";

export function isValidStats(data: unknown): data is StatsEntry {
    if (!data || typeof data !== "object") return false;

    const {
        total_spend_galactic,
        rows_affected,
        less_spent_at,
        big_spent_at,
        less_spent_value,
        big_spent_value,
        average_spend_galactic,
        big_spent_civ,
        less_spent_civ,
    } = data as Record<string, unknown>;

    const numbersAreValid =
        typeof total_spend_galactic === "number" &&
        total_spend_galactic > 0 &&
        typeof rows_affected === "number" &&
        rows_affected > 0 &&
        typeof less_spent_at === "number" &&
        typeof big_spent_at === "number" &&
        typeof less_spent_value === "number" &&
        typeof big_spent_value === "number" &&
        typeof average_spend_galactic === "number";

    const stringsAreValid =
        typeof big_spent_civ === "string" &&
        big_spent_civ.trim() !== "" &&
        typeof less_spent_civ === "string" &&
        less_spent_civ.trim() !== "";

    return numbersAreValid && stringsAreValid;
}

export function formatDayOfYear(dayOfYear: number): string {
    if (
        typeof dayOfYear !== "number" ||
        isNaN(dayOfYear) ||
        dayOfYear < 1 ||
        dayOfYear > 366
    ) {
        return "-";
    }

    const date = new Date(2025, 0);
    date.setDate(dayOfYear);

    if (isNaN(date.getTime())) {
        return "-";
    }

    const formatter = new Intl.DateTimeFormat("ru-RU", {
        day: "numeric",
        month: "long",
    });

    return formatter.format(date);
}
