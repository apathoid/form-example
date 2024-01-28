import React, { createContext, useCallback, useContext, useState } from 'react';

import { ValidationResult } from 'shared/types/common';

import { ApiError, ValidationError } from 'shared/exceptions';
import { VINFormData } from 'models/VIN/VINModel';
import { VINDataMapper } from 'dataMappers/VINDataMapper';


export interface IVINFormContext {
    VINFormData: VINFormData,
    validityState: { [K in keyof VINFormData]?: ValidationResult };
    setVINFormData: React.Dispatch<React.SetStateAction<VINFormData>>;
    setValidityState: React.Dispatch<React.SetStateAction<IVINFormContext['validityState']>>;
    setValidityStateFromResponse: (response: ApiError | ValidationError[]) => void;
    resetVINFormData: () => void;
}

export type VINFormContextValue = {
    children: React.ReactNode;
};

const Context = createContext({} as IVINFormContext);


export function ProvideVINFormContext({ children }: VINFormContextValue) {
    const context = useProvidedVINFormContext();

    return (
        <Context.Provider value={context}>
            {children}
        </Context.Provider>
    );
}

export function useVINFormContext() {
    return useContext(Context);
}

function useProvidedVINFormContext() {
    const [VINFormData, setVINFormData] = useState(VINDataMapper.toFormData());
    const [validityState, setValidityState] = useState<IVINFormContext['validityState']>({});

    /** Checks if the given response has any error and update validityState accordingly. */
    const setValidityStateFromResponse = useCallback<IVINFormContext['setValidityStateFromResponse']>(
        response => {
            let errors: ValidationError[] = [];

            if (Array.isArray(response)) {
                errors = response;
            } else if (response instanceof ApiError) {
                errors = ValidationError.fromApiError(response);
            }

            if (errors.length) {
                setValidityState(prev => {
                    const newValidityState = { ...prev };

                    errors.forEach(error => {
                        if (error.type === 'field') {
                            newValidityState[error.path as keyof typeof VINFormData] = {
                                isValid: false,
                                message: error.message
                            };
                        }
                    })

                    return newValidityState;
                });
            }
        },
        []
    );

    const resetVINFormData = useCallback(() => {
        setVINFormData(VINDataMapper.toFormData());
    }, [setVINFormData]);

    const context: IVINFormContext = {
        VINFormData,
        validityState,
        setVINFormData,
        setValidityState,
        setValidityStateFromResponse,
        resetVINFormData
    };

    return context;
}
