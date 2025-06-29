import React from 'react';
import styles from './ButtonUpload.module.css';

export type ButtonProps = {
    variant: 'active' | 'process' | 'parsing' | 'done' | 'error' | 'active2';
    children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const allowedVariants = ['active', 'process', 'parsing', 'done', 'error', 'active2'] as const;

type Variant = (typeof allowedVariants)[number];

const isValidVariant = (v: string): v is Variant => {
    return allowedVariants.includes(v as Variant);
};

export const ButtonUpload: React.FC<ButtonProps> = ({ children, variant, ...props }) => {
    const className = `${styles.button} ${
        isValidVariant(variant) ? styles[variant] : styles.active
    }`;

    return (
        <button className={className} {...props}>
            {children}
        </button>
    );
};
