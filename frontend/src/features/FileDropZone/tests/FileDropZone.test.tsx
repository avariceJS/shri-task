import { render, fireEvent, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { FileDropZone } from '..';

describe('FileDropZone', () => {
    it('должен отображать переданные children', () => {
        render(
            <FileDropZone
                dragActive={false}
                onDragOver={() => {}}
                onDragLeave={() => {}}
                onDrop={() => {}}
            >
                <p>Test child</p>
            </FileDropZone>,
        );
        expect(screen.getByText('Test child')).toBeInTheDocument();
    });

    it('должен вызывать onDragOver при событии dragover', () => {
        const onDragOver = vi.fn();
        render(
            <FileDropZone
                dragActive={false}
                onDragOver={onDragOver}
                onDragLeave={() => {}}
                onDrop={() => {}}
            >
                <p>Drag here</p>
            </FileDropZone>,
        );
        fireEvent.dragOver(screen.getByText('Drag here'));
        expect(onDragOver).toHaveBeenCalled();
    });

    it('должен вызывать onDragLeave при событии dragleave', () => {
        const onDragLeave = vi.fn();
        render(
            <FileDropZone
                dragActive={false}
                onDragOver={() => {}}
                onDragLeave={onDragLeave}
                onDrop={() => {}}
            >
                <p>Drag here</p>
            </FileDropZone>,
        );
        fireEvent.dragLeave(screen.getByText('Drag here'));
        expect(onDragLeave).toHaveBeenCalled();
    });

    it('должен вызывать onDrop при событии drop', () => {
        const onDrop = vi.fn();
        render(
            <FileDropZone
                dragActive={false}
                onDragOver={() => {}}
                onDragLeave={() => {}}
                onDrop={onDrop}
            >
                <p>Drop here</p>
            </FileDropZone>,
        );
        fireEvent.drop(screen.getByText('Drop here'));
        expect(onDrop).toHaveBeenCalled();
    });
});
