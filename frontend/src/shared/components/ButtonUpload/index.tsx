import React from "react";
import styles from "./ButtonUpload.module.css";

type ButtonProps = {
    variant: "active" | "process" | "parsing" | "done" | "error";
    children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const ButtonUpload: React.FC<ButtonProps> = ({
    children,
    variant,
    ...props
}) => {
    const className = `${styles.button} ${styles[variant] || styles.active}`;
    return (
        <button className={className} {...props}>
            {children}
        </button>
    );
};
