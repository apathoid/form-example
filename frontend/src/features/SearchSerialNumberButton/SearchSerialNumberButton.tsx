import React, { useCallback, useEffect, useState } from 'react';

import { PartiallyDefined } from 'shared/types/common';
import { ApiError, ValidationError } from 'shared/exceptions';
import { VINDataForSerialNumber } from 'models/VIN/VINModel';
import { VINPatternValidator } from 'models/VIN/VINPatternValidator';
import { VINPartsAreValid } from 'models/VIN/utils/typeguards';
import { VINDataMapper } from 'dataMappers/VINDataMapper';

import { Response, getAvailableSerialNumber } from 'models/VIN/api/getAvailableSerialNumber';

import { Button } from 'shared/buttons';


export interface ISearchSerialNumberButton {
    /** Partially defined VIN data. */
    VINData: PartiallyDefined<VINDataForSerialNumber>;
    /** Callback that will be called, when the API request has been performed. */
    onSearch: (error: ValidationError[] | ApiError | null, response?: Response) => void;
    className?: string;
}

/**
 * Button performing an API request that will ask the server to provide an available serial number.
 * Accepts partially defined VIN data and validates it,
 * allowing to make the request when the data is correct.
 */
export const SearchSerialNumberButton = React.memo((props: ISearchSerialNumberButton) => {
    const { VINData, onSearch, className } = props;

    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => setErrorMessage(''), [VINData]);

    const onClick = useCallback(async () => {
        if (!VINPartsAreValid(VINData)) {
            onSearch(VINDataMapper.uniformValidationResult(VINPatternValidator.validateFields(VINData)));
            return;
        }

        setIsLoading(true);

        try {
            const response = await getAvailableSerialNumber(VINData);
            onSearch(null, response.data);
        } catch (e) {
            const error = ApiError.responseToError(e);

            onSearch(error);
            setErrorMessage(error.message);
        } finally {
            setIsLoading(false);
        }
    }, [VINData, onSearch, setErrorMessage, setIsLoading]);

    return (
        <Button
            className={className}
            onClick={onClick}
            isLoading={isLoading}
            errorMessage={errorMessage}
        >
            search for available serial number
        </Button>
    );
});


export default SearchSerialNumberButton;
