import React from 'react';

import VINParts from './VINParts/VINParts';
import VINActions from './VINActions/VINActions';


export const VINForm = () => {
    return (
        <section>
            <h2>Construct VIN</h2>
            <VINParts />
            <VINActions />
        </section>
    );
};


export default VINForm;
