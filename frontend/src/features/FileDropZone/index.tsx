import type { FC } from "react";
import type { FileDropZoneProps } from "./interface";

export const FileDropZone: FC<FileDropZoneProps> = ({
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
            width: "100%",
        }}
    >
        {children}
    </div>
);
