export function getButtonVariant({
    isGenerating,
    isGenerated,
    error,
}: {
    isGenerating: boolean;
    isGenerated: boolean;
    error: string | null | undefined;
}): 'active' | 'parsing' | 'done' | 'error' {
    if (isGenerating) return 'parsing';
    if (error) return 'error';
    if (isGenerated) return 'done';
    return 'active';
}

export function getStatusMessage({
    isGenerating,
    isGenerated,
    error,
}: {
    isGenerating: boolean;
    isGenerated: boolean;
    error: string | null | undefined;
}): string {
    if (isGenerating) return 'идёт процесс генерации...';
    if (isGenerated) return 'файл сгенерирован!';
    if (error) return 'упс, не то...';
    return '';
}
