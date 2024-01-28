import { IVIN, VINDataForSerialNumber, VINFormData, VINParts } from 'models/VIN/VINModel';
import { PartiallyDefined, ValidationResult } from 'shared/types/common';
import { ValidationError } from 'shared/exceptions';


/** Utility class that allows to transform VIN data. */
export class VINDataMapper {
    /**
     * Transforms VIN parts to the form data.
     * Useful if the manual construction of the VIN is involved.
     */
    static toFormData(vin?: VINParts) {
        const VINFormData: VINFormData = {
            version: vin?.version,
            equipmentCode: vin?.equipmentCode,
            issueYear: vin?.issueYear,
            serialNumber: vin?.serialNumber,
            productionPlace: vin?.productionPlace
        };

        return VINFormData;
    }

    /** Transforms VIN data to the payload to the request for available serial number. */
    static toSerialNumberReq(VINData: PartiallyDefined<IVIN>) {
        const dataFormSerialNumberRequest: PartiallyDefined<VINDataForSerialNumber> = {
            version: VINData.version,
            equipmentCode: VINData.equipmentCode,
            issueYear: VINData.issueYear,
            productionPlace: VINData.productionPlace
        };
        
        return dataFormSerialNumberRequest;
    }

    /** Transforms the given record with the validation result to an array of ValidationError type errors. */
    static uniformValidationResult(result: Record<keyof VINParts, ValidationResult>): ValidationError[] {
        return Object.entries(result).map(([field, value]) => {
            return new ValidationError('field', field, value.message);
        });
    }
}
