import { Model } from 'mongoose';

import { IVIN } from '../../models/VIN/VINModel';

import { ApiError } from '../../exceptions/ApiError';
import VINDataMapper from '../../dataMappers/VINDataMapper';


export default class VINService {
    private VINModel: Model<IVIN>;

    constructor(VINModel: Model<IVIN>) {
        this.VINModel = VINModel;
    }

    /** Returns all the VIN entries. */
    async getVINEntries() {
        const VINDocumentList = await this.VINModel.find();

        return VINDocumentList.map(VINDataMapper.toVIN);
    }

    /** Adds the given VIN entry to the DB. */
    async createVIN(VIN: Omit<IVIN, 'id'>) {
        if (await this.VINModel.findOne({ serialNumber: VIN.serialNumber })) {
            throw ApiError.BadRequest(null, 'The VIN already exists.');
        }

        const VINDocument = new this.VINModel(VIN);
        await VINDocument.save();

        return VINDataMapper.toVIN(VINDocument);
    }
}
