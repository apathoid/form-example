import React from 'react';
import { memo } from 'shared/utils/react';

import localClasses from './styles.module.scss';

import { ListItem } from 'shared/types/common';
import { SelectFieldData } from './types';

import BaseField, { IBaseField } from '../BaseField/BaseField';


export interface ISelectField extends IBaseField<SelectFieldData> {
    options: ListItem[];
}

/** A base component for selectable form fields. */
export const SelectField = memo((props: ISelectField) => {
    const {
        id, field, placeholder, options, data, setData, classes
    } = props;

    return (
        <BaseField {...props}>
            <select
                className={
                    localClasses.field
                    + (classes?.field ? ` ${classes.field}` : '')
                }
                id={id}
                name={field}
                value={data ?? ''}
                onChange={e => setData(e.target.value, field)}
            >
                {placeholder && (
                    <option disabled value="">
                        {placeholder}
                    </option>
                )}
                {options.map(option => (
                    <option
                        key={option.value}
                        value={option.value}
                    >
                        {option.name}
                    </option>
                ))}
            </select>
        </BaseField>
    );
});


export default SelectField;
