import React, { useCallback } from 'react';
import { memo } from 'shared/utils/react';

import { VINFormSchemeSelectItem } from 'shared/types/form';
import { ISelectField, SelectField } from 'shared/fields';

import { useVINFormContext } from 'components/context/VINFormContext';


export interface IVINPartSelectField {
    item: VINFormSchemeSelectItem;
    classes: ISelectField['classes'];
}

export const VINPartSelectField = memo((props: IVINPartSelectField) => {
    const { item, classes } = props;

    const {
        VINFormData, validityState, setVINFormData, setValidityState
    } = useVINFormContext();

    const field = item.field as keyof typeof VINFormData;

    const setData = useCallback((data: string | number, field: string) => {
        const _field = field as keyof typeof VINFormData;
        setVINFormData(prev => ({ ...prev, [_field]: data }));

        // Reset validation state when the field receives new value.
        setValidityState(prev => ({ ...prev, [_field]: { ...prev[_field], isValid: true } }));
    }, [setVINFormData, setValidityState]);

    return (
        <SelectField
            key={item.field}
            field={item.field}
            name={item.name}
            placeholder="pick value"
            options={item.options || []}
            data={VINFormData[field]}
            setData={setData}
            errorMessage={
                !validityState[field]?.isValid ? validityState[field]?.message : undefined
            }
            classes={classes}
        />
    );
});


export default VINPartSelectField;
