import React, { useCallback, useEffect, useState } from 'react';

import { PartiallyDefined } from 'shared/types/common';
import { ApiError } from 'shared/exceptions';
import { IVIN } from 'models/VIN/VINModel';
import { VINIsValid } from 'models/VIN/utils/typeguards';

import { createVIN } from 'models/VIN/api';

import { Button } from 'shared/buttons';


export interface IAddVINButton {
    /** Partially defined VIN data. */
    VINData: PartiallyDefined<IVIN>;
    /** Callback that will be called, when the API request has been performed. */
    onCreate: (error: ApiError | null, response?: IVIN) => void;
}

/**
 * Button performing an API request that will ask the server to create a new VIN entry.
 * Accepts partially defined VIN data and validates it,
 * allowing to make the request when the data is correct.
 * Maintains the `disabled` state of the button.
 */
export const AddVINButton = React.memo((props: IAddVINButton) => {
    const { VINData, onCreate } = props;

    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const isVINValid = VINIsValid(VINData);

    useEffect(() => setErrorMessage(''), [VINData]);

    const onClick = useCallback(async () => {
        if (!isVINValid) {
            return;
        }

        setIsLoading(true);

        try {
            const response = await createVIN(VINData);
            onCreate(null, response.data);
        } catch (e) {
            const error = ApiError.responseToError(e);
            onCreate(error);
            setErrorMessage(error.message);
        } finally {
            setIsLoading(false);
        }
    }, [VINData, isVINValid, setIsLoading]);

    return (
        <Button
            onClick={onClick}
            disabled={!isVINValid}
            isLoading={isLoading}
            errorMessage={errorMessage}
        >
            add
        </Button>
    );
});


export default AddVINButton;
