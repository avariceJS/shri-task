import React from "react";
import styles from "./Button.module.css";

type ButtonProps = {
    variant: "active" | "unactive" | "download" | "clear";
    children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = ({
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
