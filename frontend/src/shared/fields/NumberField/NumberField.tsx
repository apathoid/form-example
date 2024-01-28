import React from 'react';
import { memo } from 'shared/utils/react';

import localClasses from './styles.module.scss';

import { NumberFieldData } from './types';
import BaseField, { IBaseField } from '../BaseField/BaseField';


export interface INumberField extends IBaseField<NumberFieldData> {
    onBlur?: React.HTMLAttributes<HTMLInputElement>['onBlur'];
}

/** A base component for numeric form fields. */
export const NumberField = memo((props: INumberField) => {
    const {
        id, field, placeholder, data, setData, classes
    } = props;

    return (
        <BaseField {...props}>
            <input
                className={
                    localClasses.field
                    + (classes?.field ? ` ${classes.field}` : '')
                }
                id={id}
                type="number"
                name={field}
                placeholder={placeholder}
                value={data ?? ''}
                onChange={e => setData(e.target.value, field)}
                onBlur={props.onBlur}
            />
        </BaseField>
    );
});


export default NumberField;
