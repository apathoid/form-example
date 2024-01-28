import React from 'react';
import { memo } from 'shared/utils/react';

import { VINFormSchemeItem } from 'shared/types/form';

import VINPartNumberField, { IVINPartNumberField } from './VINPartNumberField';
import VINPartSelectField, { IVINPartSelectField } from './VINPartSelectField';


interface IVINPartFieldFactory {
    item: VINFormSchemeItem;
    classes?: IVINPartNumberField['classes'] | IVINPartSelectField['classes'];
}

export const VINPartFieldFactory = memo((props: IVINPartFieldFactory) => {
    const { item, classes } = props;

    if (item.type === 'number') {
        return <VINPartNumberField item={item} classes={classes} />
    }

    if (item.type === 'select') {
        return <VINPartSelectField item={item} classes={classes} />;
    }

    return null;
});


export default VINPartFieldFactory;
