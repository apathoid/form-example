import React, { useCallback, useState } from 'react';

import { GetAllVINEntriesButton, IGetAllVINEntriesButton } from 'features';
import { VINTable as VINTableWidget } from 'widgets';

import { useVINStoreContext } from 'components/context/VINStoreContext';


export const VINTable = () => {
    const { VINList, setVINList } = useVINStoreContext();

    const [isLoaded, setIsLoaded] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const onLoad = useCallback<IGetAllVINEntriesButton['onLoad']>((error, response) => {
        if (error) {
            setErrorMessage(error.message);
            return;
        }
        
        if (!response?.length) {
            setErrorMessage('There is no data to display');
        } else {
            setVINList(response);
            setErrorMessage('');
        }

        setIsLoaded(true);
    }, [setIsLoaded, setErrorMessage]);

    return (
        <article>
            <h2>List all VIN entries</h2>

            <GetAllVINEntriesButton onLoad={onLoad} />

            <br />
            {isLoaded && (
                errorMessage || <VINTableWidget VINList={VINList} />
            )}
        </article>
    );
};


export default VINTable;
