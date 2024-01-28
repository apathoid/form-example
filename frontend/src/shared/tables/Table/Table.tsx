import React from 'react';

import localClasses from './styles.module.scss';

import { TableCell, TableRow } from '../types';


export interface ITable {
    header?: TableCell[];
    data: TableRow[];
}

export const Table = React.memo((props: ITable) => {
    const { header, data } = props;

    return (
        <table className={localClasses.table}>
            <thead>
                <tr>
                    {header?.map(cell => (
                        <th key={cell.value}>
                            {cell.name}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map(row => (
                    <tr key={row.value}>
                        {row.cells.map(cell => (
                            <td key={cell.value}>
                                {cell.name}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
});


export default Table;
