import React, { createContext, useContext, useState } from 'react';

import { IVIN } from 'models/VIN/VINModel';


export interface IVINStoreContext {
    VINList: IVIN[];
    setVINList: React.Dispatch<React.SetStateAction<IVIN[]>>;
}

export type VINStoreContextValue = {
    children: React.ReactNode;
};

const Context = createContext({} as IVINStoreContext);


export function ProvideVINStoreContext({ children }: VINStoreContextValue) {
    const context = useProvidedVINStoreContext();

    return (
        <Context.Provider value={context}>
            {children}
        </Context.Provider>
    );
}

export function useVINStoreContext() {
    return useContext(Context);
}

function useProvidedVINStoreContext() {
    const [VINList, setVINList] = useState<IVIN[]>([]);

    const context: IVINStoreContext = {
        VINList,
        setVINList
    };

    return context;
}
