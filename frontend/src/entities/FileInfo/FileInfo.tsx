import { ButtonUpload } from "../../shared/components/ButtonUpload";
import styles from "./FileInfo.module.css";
type Props = {
    children: string;
    onClear: () => void;
    loading: boolean;
    isParsed: boolean;
    error?: string | null;
};

export function FileInfo({ children, onClear, loading, isParsed, error }: Props) {
    return (
        <div className={styles.container}>
            <ButtonUpload
                variant={error ? "error" : isParsed ? "done" : "process"}
            >
                {children}
            </ButtonUpload>
            <button
                className={styles.button}
                onClick={onClear}
                disabled={loading}
            >
                <img
                    src="public/proicons_cancel.png"
                    width={20}
                    height={20}
                    alt="cancel"
                />
            </button>
        </div>
    );
}
