import React, { useCallback, useEffect, useState } from 'react';

import classes from './styles.module.scss';

import { VINService } from 'models/VIN/VINService';
import { VINIsValid } from 'models/VIN/utils/typeguards';

import { Button } from 'shared/buttons';
import { AddVINButton, IAddVINButton } from 'features';

import { useVINFormContext } from 'components/context/VINFormContext';


export const VINActions = () => {
    const { VINFormData, setValidityStateFromResponse, resetVINFormData } = useVINFormContext();

    const [generatedVIN, setGeneratedVIN] = useState('');

    // Reset the generated VIN value if the value of form fields is changes.
    useEffect(() => setGeneratedVIN(''), [VINFormData]);

    const isVINValid = VINIsValid(VINFormData);

    const onGenerate = useCallback(() => {
        if (isVINValid) {
            setGeneratedVIN(VINService.generateVIN(VINFormData));
        }
    }, [isVINValid]);

    const onCreate = useCallback<IAddVINButton['onCreate']>(error => {
        if (error) {
            setValidityStateFromResponse(error);
        } else {
            resetVINFormData();
        }
    }, [setValidityStateFromResponse]);

    return (
        <div>
            <h3>Generate VIN</h3>
            <div className={classes.buttons}>
                <Button
                    disabled={!isVINValid || !!generatedVIN.length}
                    onClick={onGenerate}
                >
                    generate
                </Button>

                <AddVINButton
                    VINData={VINFormData}
                    onCreate={onCreate}
                />
            </div>

            {!!generatedVIN.length && isVINValid && (
                <>
                    <hr />
                    VIN: {generatedVIN}
                </>
            )}
        </div>
    );
};


export default VINActions;
