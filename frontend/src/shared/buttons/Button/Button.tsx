import React from 'react';
import { memo } from 'shared/utils/react';

import classes from './styles.module.scss';


export interface IButton {
    children?: React.ReactNode;
    onClick?: React.HTMLAttributes<HTMLButtonElement>['onClick'];
    disabled?: boolean;
    isLoading?: boolean;
    className?: string;
    errorMessage?: string;
}

/** A base component for any button. */
export const Button = memo((props: IButton) => {
    const {
        onClick, disabled, isLoading, className, errorMessage
    } = props;

    return (
        <div className={classes.container}>
            <button
                className={className}
                onClick={onClick}
                disabled={disabled}
            >
                {isLoading ? 'loading...' : props.children}
            </button>
            {errorMessage && (
                <p className={classes.errorMessage}>
                    {errorMessage}
                </p>
            )}
        </div>
    );
});


export default Button;
