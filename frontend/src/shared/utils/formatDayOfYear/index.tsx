export function formatDayOfYear(dayOfYear: number): string {
    if (typeof dayOfYear !== 'number' || isNaN(dayOfYear) || dayOfYear < 1 || dayOfYear > 366) {
        return '-';
    }

    const date = new Date(2025, 0);
    date.setDate(dayOfYear);

    if (isNaN(date.getTime())) {
        return '-';
    }

    const formatter = new Intl.DateTimeFormat('ru-RU', {
        day: 'numeric',
        month: 'long',
    });

    return formatter.format(date);
}
