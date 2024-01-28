import { ValidationResult } from 'shared/types/common';
import { VINParts } from './VINModel';


/** Set of methods that allow to validate a VIN entry. */
export class VINPatternValidator {
    private constructor() {}

    /** Validates value of the given VIN field. */
    static validateField(field: keyof VINParts, value: VINParts[keyof VINParts]) {
        const fieldPattern = VINPatternValidator.pattern[field];
        const validationResult: ValidationResult = {
            isValid: false
        };

        if (value === undefined) {
            validationResult.message = 'The value is missing';

            return validationResult;
        }

        if (!fieldPattern.test(value)) {
            validationResult.message = `The value has to match the pattern ${fieldPattern}`;

            return validationResult;
        }

        validationResult.isValid = true;

        return validationResult;
    }

    /** Validates passed VIN data fields. */
    static validateFields(VINData: VINParts) {
        const result = Object.entries(VINData).reduce((result, [field, value]) => {
            const _field = field as keyof typeof VINData;

            result[_field] = VINPatternValidator.validateField(_field, value);

            return result;
        }, {} as Record<keyof typeof VINData, ValidationResult>);

        return result;
    }

    /** Constraints. */
    static pattern = {
        version: /^\d{3}$/,
        equipmentCode: /^\d{3}$/,
        issueYear: /^\d{2}$/,
        serialNumber: /^1\d{5}$/,
        productionPlace: /^\d{2}$/
    }
}
