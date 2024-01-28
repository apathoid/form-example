import { HydratedDocument } from 'mongoose';

import { IVIN } from '../models/VIN/VINModel';


export default class VINDataMapper {
    /** Removes all DB related properties from the model. */
    static toVIN(VINModel: HydratedDocument<IVIN>) {
        const VIN: IVIN = {
            id: VINModel._id.toString(),
            version: VINModel.version,
            equipmentCode: VINModel.equipmentCode,
            issueYear: VINModel.issueYear,
            serialNumber: VINModel.serialNumber,
            productionPlace: VINModel.productionPlace
        };

        return VIN;
    }
}
