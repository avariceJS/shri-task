import { Button } from '../../../shared/components/Button';
import { ButtonUpload } from '../../../shared/components/ButtonUpload';
import Spinner from '../../../shared/components/Spinner';
import { ReportStatusMessage } from './ReportStatusMessage';

type Props = {
    onClick: () => void;
    disabled: boolean;
    variant: 'active' | 'parsing' | 'done' | 'error';
    message: string;
    isLoading: boolean;
};

export function GenerateAction({ onClick, disabled, variant, message, isLoading }: Props) {
    return (
        <>
            {variant === 'active' ? (
                <Button variant="active" onClick={onClick} disabled={disabled}>Начать генерацию</Button>
            ) : (
                <ButtonUpload variant={variant} onClick={onClick} disabled={disabled}>
                    {isLoading ? <Spinner /> : 'Начать генерацию'}
                </ButtonUpload>
            )}
            <ReportStatusMessage message={message} />
        </>
    );
}
