import React from 'react';

import classes from './styles.module.scss';

import {
    ProvideVINStoreContext,
    ProvideVINFormContext
} from 'components/context';
import VINForm from './components/VINForm/VINForm';
import VINTable from 'components/VINTable/VINTable'


export const App = () => {
    return (
        <ProvideVINStoreContext>
            <main>
                <ProvideVINFormContext>
                    <VINForm />
                </ProvideVINFormContext>

                <div className={classes.vinTable}>
                    <VINTable />
                </div>
            </main>
        </ProvideVINStoreContext>
    );
};


export default App;
