import { FileInfo } from '../../../entities/FileInfo/FileInfo';
import { ReportStatusMessage } from './ReportStatusMessage';

type Props = {
    onClear: () => void;
    message: string;
};

export function ReportResult({ onClear, message }: Props) {
    return (
        <>
            <FileInfo onClear={onClear} loading={false} isParsed={true} children="Done!" />
            <ReportStatusMessage message={message} />
        </>
    );
}
