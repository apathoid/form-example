import { PartiallyDefined } from 'shared/types/common';
import { IVIN, VINParts } from '../VINModel';
import { VINPatternValidator } from '../VINPatternValidator';


/** Checks if VIN parts are filled correctly. */
export function VINPartsAreValid<P extends keyof VINParts>(
    VINParts: Pick<VINParts, P>
): VINParts is Record<P, IVIN[P]> {
    const validationResult = VINPatternValidator.validateFields(VINParts);

    return !Object.values(validationResult).some(field => !field.isValid);
}


/** Checks if the given object is valid VIN. */
export function VINIsValid(VINData: PartiallyDefined<IVIN>): VINData is IVIN {
    return VINPartsAreValid(VINData);
}