import { UploadHistoryWidget } from "../../widgets/UploadHistoryWidget";

export default function HistoryPage() {
    return (
        <div style={{ padding: 20 }}>
            <h1>История загрузок</h1>
            <UploadHistoryWidget />
        </div>
    );
}
