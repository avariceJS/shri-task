import { ButtonUpload } from "../../shared/components/ButtonUpload";
import Spinner from "../../shared/components/Spinner";
import { useGenerateReport } from "./hooks/useGenerateReport";
import { FileInfo } from "../../entities/FileInfo/FileInfo";
import styles from "./index.module.css";

export function GenerateReportButton() {
    const { handleGenerate, isGenerating, isGenerated, error, generatedFile } =
        useGenerateReport();

    let variant: "active" | "parsing" | "done" | "error" = "active";
    if (isGenerating) variant = "parsing";
    else if (error) variant = "error";
    else if (isGenerated) variant = "done";

    let message = "";
    if (isGenerating) message = "идёт процесс генерации...";
    else if (isGenerated) message = "файл сгенерирован!";
    else if (error) message = "упс, не то...";

    return (
        <div className={styles.container}>
            {isGenerated && generatedFile ? (
                <>
                    <FileInfo
                        onClear={() => window.location.reload()}
                        loading={false}
                        isParsed={true}
                        children="Done!"
                    />
                    <p>{message}</p>
                </>
            ) : (
                <>
                    <ButtonUpload
                        variant={variant}
                        onClick={handleGenerate}
                        disabled={isGenerating}
                    >
                        {isGenerating ? <Spinner /> : "Сгенерировать файл"}
                    </ButtonUpload>
                    {message && <p>{message}</p>}
                </>
            )}
        </div>
    );
}
