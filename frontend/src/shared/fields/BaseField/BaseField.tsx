import React from 'react';
import { memo } from 'shared/utils/react';

import localClasses from './styles.module.scss';

import { IFormField } from '../types';


export interface IBaseField<D> extends IFormField<D> {}

interface IBaseFieldProtected {
    children?: React.ReactNode;
}

/** A base component of any form field. Incapsulates common appearance and behavior. */
export const BaseField = memo(function<D = unknown>(props: IBaseField<D> & IBaseFieldProtected) {
    const { id, name, errorMessage, classes } = props;

    return (
        <div
            className={
                localClasses.container
                + (classes?.container ? ` ${classes.container}` : '')
            }
        >
            {name && (
                <div
                    className={
                        localClasses.header
                        + (classes?.header ? ` ${classes.header}` : '')
                    }
                >
                    <label
                        htmlFor={id}
                        className={
                            localClasses.label
                            + (classes?.label ? ` ${classes.label}` : '')
                        }
                    >
                        {name}
                    </label>
                </div>
            )}

            {props.children}

            {errorMessage && (
                <p
                    className={
                        localClasses.errorMessage
                        + (classes?.error ? ` ${classes.error}` : '')
                    }
                >
                    {errorMessage}
                </p>
            )}
        </div>
    );
});


export default BaseField;
