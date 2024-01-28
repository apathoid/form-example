import React, { useCallback, useState } from 'react';

import { ApiError } from 'shared/exceptions';
import { IVIN } from 'models/VIN/VINModel';

import { getAllVINEntries } from 'models/VIN/api';

import { Button } from 'shared/buttons';


export interface IGetAllVINEntriesButton {
    /** Callback that will be called, when the API request has been performed. */
    onLoad: (error: ApiError | null, response?: IVIN[]) => void;
}

/**
 * Button performing an API request that will ask the server to get a list of all the VIN entries.
 */
export const GetAllVINEntriesButton = React.memo((props: IGetAllVINEntriesButton) => {
    const { onLoad } = props;

    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const onClick = useCallback(async () => {
        setIsLoading(true);

        try {
            const response = await getAllVINEntries();
            onLoad(null, response.data);
            setErrorMessage('');
        } catch (e) {
            const apiError = ApiError.responseToError(e);
            onLoad(apiError);
            setErrorMessage(apiError.message);
        } finally {
            setIsLoading(false);
        }
    }, [onLoad, setIsLoading, setErrorMessage]);

    return (
        <Button
            onClick={onClick}
            isLoading={isLoading}
            errorMessage={errorMessage}
        >
            get entries
        </Button>
    );
});


export default GetAllVINEntriesButton;
