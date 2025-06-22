export function ReportStatusMessage({ message }: { message: string }) {
    return message ? <p>{message}</p> : null;
}
