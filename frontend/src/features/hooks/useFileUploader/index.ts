import { useStore } from '../../../shared/store/useStore';
import { isCsvFile } from '../ui/isCsvFile';
import { uploadFile } from '../ui/uploadFile';

const API_URL = 'http://localhost:3000/aggregate?rows=100';

export function useFileUploader() {
    const {
        file,
        setFile,
        setLoading,
        setError,
        setStats,
        setIsParsing,
        setIsParsed,
        loading,
        error,
        stats,
        isParsing,
        isParsed,
        dragActive,
        setDragActive,
        addToHistory,
        clearFile,
    } = useStore();

    const handleFileSelected = (selectedFile: File | null) => {
        clearFile();
        if (!selectedFile) return;
        if (!isCsvFile(selectedFile)) {
            setError('упс, не то...');
            return;
        }
        setFile(selectedFile);
    };

    const handleSendFile = async () => {
        if (!file) return;

        setLoading(true);
        setIsParsing(true);
        setIsParsed(false);
        setError(null);
        setStats([]);

        const { result, latestValid } = await uploadFile(API_URL, file, (parsed) =>
            setStats([...parsed]),
        );

        addToHistory(result);

        if (!latestValid) {
            setError('упс, не то...');
            setIsParsed(false);
        } else {
            setIsParsed(true);
        }

        setLoading(false);
        setIsParsing(false);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragActive(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragActive(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragActive(false);
        if (e.dataTransfer.files.length > 0) {
            handleFileSelected(e.dataTransfer.files[0]);
        }
    };

    const latestStats = stats.length > 0 ? stats[stats.length - 1] : undefined;

    return {
        file,
        loading,
        error,
        dragActive,
        latestStats,
        isParsing,
        isParsed,
        handleFileSelected,
        handleSendFile,
        handleDragOver,
        handleDragLeave,
        handleDrop,
        clearFile,
    };
}
