type Props = {
    file: File;
    onClear: () => void;
    loading: boolean;
};

export function FileInfo({ file, onClear, loading }: Props) {
    return (
        <div>
            <p>
                Файл загружен: <strong>{file.name}</strong>
            </p>
            <button onClick={onClear} disabled={loading}>
                ✖ Убрать файл
            </button>
        </div>
    );
}
