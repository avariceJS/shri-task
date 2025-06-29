import { render, screen } from '@testing-library/react';
import HistoryPage from '../HistoryPage';
import { vi } from 'vitest';

vi.mock('../../widgets/UploadHistoryWidget', () => ({
    UploadHistoryWidget: () => <div data-testid="upload-history-widget" />,
}));

describe('HistoryPage', () => {
    it('рендерит UploadHistoryWidget', () => {
        render(<HistoryPage />);
        expect(screen.getByTestId('upload-history-widget')).toBeInTheDocument();
    });
});
