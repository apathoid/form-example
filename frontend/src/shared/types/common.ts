/**
 * Makes all keys in T partial keeping them required to be passed.
 * If the second parameter is present, will make only passed keys partially defined.
 */
export type PartiallyDefined<T, V extends keyof T = keyof T> = {
    [K in keyof T]: K extends V ? T[K] | undefined : T[K];
};


/** Base type of any list item. */
export type ListItem = {
    /** Item visible name. */
    name: string;
    /** Item unique identifier. */
    value: string;
};


/** A common structure of any validation result. */
export type ValidationResult = {
    isValid: boolean;
    message?: string;
};
