import type { FC } from "react";
import type { FileDropZoneProps } from "./interface";

export const FileDropZone: FC<FileDropZoneProps> = ({
    dragActive,
    onDragOver,
    onDragLeave,
    onDrop,
    children,
}) => (
    <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        style={{
            border: "2px dashed #ccc",
            padding: 20,
            marginBottom: 10,
            cursor: "pointer",
            backgroundColor: dragActive ? "#D4FAE6" : undefined,
        }}
    >
        {children}
    </div>
);
