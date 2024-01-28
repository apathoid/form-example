import React, { useCallback, useState } from 'react';

import classes from './styles.module.scss';

import { VINDataMapper } from 'dataMappers/VINDataMapper';
import { VINFormScheme } from 'staticData/VINFormScheme';

import {
    ISearchSerialNumberButton,
    SearchSerialNumberButton
} from 'features';

import { useVINFormContext } from 'components/context/VINFormContext';
import VINPartFieldFactory from './FieldFactory/VINPartFieldFactory';


export const VINParts = () => {
    const {
        VINFormData, setVINFormData, setValidityState, setValidityStateFromResponse
    } = useVINFormContext();

    /** Name of the VIN field that should be highlighted. */
    const [highlightField, setHighlightField] = useState<keyof typeof VINFormData | null>(null);

    const onSearch = useCallback<ISearchSerialNumberButton['onSearch']>((error, response) => {
        if (error) {
            setValidityStateFromResponse(error);
            return;
        }

        if (response !== undefined) {
            setVINFormData(prev => ({ ...prev, serialNumber: String(response) }));
            setValidityState(prev => ({ ...prev, serialNumber: { isValid: true } }));

            // Highlight the field for a moment so that the user can notice that the value has been set.
            setHighlightField('serialNumber');
            setTimeout(() => setHighlightField(null), 3000);
        }
    }, [setVINFormData, setValidityState, setValidityStateFromResponse, setHighlightField]);

    return (
        <div className={classes.container}>
            <div className={classes.fields}>
                {VINFormScheme.map(item => (
                    <VINPartFieldFactory
                        key={item.field}
                        item={item}
                        classes={
                            item.field === highlightField
                                ? { field: classes.highlightField }
                                : undefined
                        }
                    />
                ))}
            </div>

            <SearchSerialNumberButton
                VINData={VINDataMapper.toSerialNumberReq(VINFormData)}
                onSearch={onSearch}
                className={classes.searchButton}
            />
        </div>
    );
};


export default VINParts;
