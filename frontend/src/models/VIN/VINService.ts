import { IVIN } from './VINModel';


/** VIN data manipulation. */
export class VINService {
    private constructor() {}

    /** Returns a string representation of the VIN data. */
    static generateVIN(VIN: IVIN) {
        const {
            version, equipmentCode, issueYear, serialNumber, productionPlace
        } = VIN;

        return `${version}${equipmentCode}${issueYear}${serialNumber}${productionPlace}`;
    }

    /** Converts VIN data value codes to their verbose representation. */
    static codeToName(field: 'equipmentCode' | 'productionPlace', code: string) {
        if (field === 'equipmentCode') {
            return VINService.expandEquipmentCode(code);
        }

        if (field === 'productionPlace') {
            return VINService.expandProductionPlace(code);
        }

        return code;
    }

    /** Converts an equipment code to its name. */
    private static expandEquipmentCode(code: string) {
        const codeTable: Record<string, string> = {
            '000': 'Base platform',
            '014': 'Bumper',
            '037': 'Drum Mulcher',
            '036': 'Side Trimmer',
            '038': 'Sprayer',
            '027': 'Lawn Mower'
        };

        return codeTable[code];
    }

    /** Converts a production place code to its name. */
    private static expandProductionPlace(code: string) {
        const codeTable: Record<string, string> = {
            '00': 'Slovenia',
            '01': 'Turkey'
        };

        return codeTable[code];
    }
}
