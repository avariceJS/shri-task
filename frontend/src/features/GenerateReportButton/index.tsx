import { useGenerateReport } from './hooks/useGenerateReport';
import styles from './styles/index.module.css';
import { GenerateAction } from './ui/GenerateAction';
import { getButtonVariant, getStatusMessage } from './ui/helpers';
import { ReportResult } from './ui/ReportResult';
import { useStore } from '../../shared/store/useStore';

export function GenerateReportButton() {
    const { handleGenerate, isGenerating, isGenerated, error, generatedFile } = useGenerateReport();

    const resetReportState = useStore((state) => state.resetReportState);

    const variant = getButtonVariant({ isGenerating, isGenerated, error });
    const message = getStatusMessage({ isGenerating, isGenerated, error });

    return (
        <div className={styles.container}>
            {isGenerated && generatedFile ? (
                <ReportResult onClear={resetReportState} message={message} />
            ) : (
                <GenerateAction
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    variant={variant}
                    message={message}
                    isLoading={isGenerating}
                />
            )}
        </div>
    );
}
