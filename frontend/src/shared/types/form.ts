import { ListItem } from './common';


/** Type of a number field scheme. */
export type VINFormSchemeNumberItem = {
    type: 'number';
    field: string;
    name: string;
};

/** Type of a select field scheme. */
export type VINFormSchemeSelectItem = {
    type: 'select';
    field: string;
    name: string;
    options: ListItem[];
};

/** Type of a scheme item. */
export type VINFormSchemeItem = VINFormSchemeNumberItem | VINFormSchemeSelectItem;
