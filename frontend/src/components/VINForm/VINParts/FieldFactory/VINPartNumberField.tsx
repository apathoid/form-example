import React, { useCallback } from 'react';
import { memo } from 'shared/utils/react';

import { VINFormSchemeNumberItem } from 'shared/types/form';

import { VINPatternValidator } from 'models/VIN/VINPatternValidator';

import { INumberField, NumberField } from 'shared/fields';

import { useVINFormContext } from 'components/context/VINFormContext';


export interface IVINPartNumberField {
    item: VINFormSchemeNumberItem;
    classes: INumberField['classes'];
}

export const VINPartNumberField = memo((props: IVINPartNumberField) => {
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

    // Perform the field value validation on blur event.
    const onBlur = useCallback<NonNullable<INumberField['onBlur']>>(e => {
        const field = e.target.name as keyof typeof VINFormData;
        const fieldValue = e.target.value;

        const validationResult = VINPatternValidator.validateField(field, fieldValue);

        setValidityState(prev => ({ ...prev, [field]: validationResult }));
    }, [setValidityState]);

    return (
        <NumberField
            key={item.field}
            field={item.field}
            name={item.name}
            placeholder="enter value"
            data={VINFormData[field]}
            setData={setData}
            onBlur={onBlur}
            errorMessage={
                !validityState[field]?.isValid ? validityState[field]?.message : undefined
            }
            classes={classes}
        />
    );
});


export default VINPartNumberField;
