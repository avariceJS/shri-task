import styles from './styles/index.module.css';
import { GenerateReportButton } from '../../features/GenerateReportButton';

export default function GeneratePage() {
    return (
        <div className={styles.container}>
            <h1>Сгенерируйте готовый csv-файл нажатием одной кнопки</h1>
            <GenerateReportButton />
        </div>
    );
}
