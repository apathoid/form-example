import { PartiallyDefined } from 'shared/types/common';


/** VIN structure. */
export interface IVIN {
    version: string;
    equipmentCode: string;
    issueYear: string;
    serialNumber: string;
    productionPlace: string;
}

/** An alias listing VIN fields. Useful if needed to pass partially filled VIN. */
export type VINParts = Partial<IVIN>;
/**
 * Structure of VIN data that is being constructed by a user.
 * On the form page, for example.
 */
export type VINFormData = PartiallyDefined<IVIN>;
/** Structure of the payload to the request for the available serial number. */
export type VINDataForSerialNumber = Pick<
    IVIN,
    | 'version'
    | 'equipmentCode'
    | 'issueYear'
    | 'productionPlace'
>;
