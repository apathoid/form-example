import React, { useMemo } from 'react';

import { IVIN } from 'models/VIN/VINModel';
import { VINService } from 'models/VIN/VINService';

import { ITable, Table } from 'shared/tables';


export interface IVINTable {
    VINList: IVIN[];
}

export const VINTable = React.memo((props: IVINTable) => {
    const { VINList } = props;

    const header = useMemo<ITable['header']>(() => [
        { name: 'version', value: 'version' },
        { name: 'equipment code', value: 'equipmentCode' },
        { name: 'issue year', value: 'issueYear' },
        { name: 'serial number', value: 'serialNumber' },
        { name: 'production place', value: 'productionPlace' }
    ], [])

    const data = useMemo<ITable['data']>(() => {
        return VINList.map((VIN, idx) => {
            return {
                value: String(idx),
                cells: [
                    { name: VIN.version, value: 'version' },
                    {
                        name: VINService.codeToName('equipmentCode', VIN.equipmentCode),
                        value: 'equipmentCode'
                    },
                    { name: VIN.issueYear, value: 'issueYear' },
                    { name: VIN.serialNumber, value: 'serialNumber' },
                    {
                        name: VINService.codeToName('productionPlace', VIN.productionPlace),
                        value: 'productionPlace'
                    }
                ]
            };
        });
    }, [VINList]);

    return (
        <Table
            header={header}
            data={data}
        />
    );
});


export default VINTable;
