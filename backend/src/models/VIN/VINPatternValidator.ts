export class VINPatternValidator {
    private constructor() {}

    /** Constraints. */
    static pattern = {
        version: /^\d{3}$/,
        equipmentCode: /^\d{3}$/,
        issueYear: /^\d{2}$/,
        serialNumber: /^1\d{5}$/,
        productionPlace: /^\d{2}$/
    }
}
