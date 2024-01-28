export type TableCell = {
    name: string;
    value: string;
};

export type TableRow = {
    value: string;
    cells: TableCell[];
};
