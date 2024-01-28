/** Base type of any form field. All fields should implement this interface. */
export interface IFormField<D> {
    id?: string;
    name?: string;
    field: string;
    placeholder?: string;
    data: D | null | undefined;
    setData: (data: D, field: string) => void;
    errorMessage?: string;
    classes?: {
        container?: string;
        header?: string;
        label?: string;
        field?: string;
        error?: string;
    };
}
