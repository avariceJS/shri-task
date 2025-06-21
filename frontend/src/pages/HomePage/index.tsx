import { FileUploaderWidget } from "../../widgets/FileUploaderWidget";


export default function HomePage() {
    return (
        <div style={{ padding: 20 }}>
            <h1>Загрузите csv файл и получите полную информацию о нём</h1>
            <FileUploaderWidget />
        </div>
    );
}
