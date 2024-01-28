import { Model } from 'mongoose';

import { ISerialNumber } from '../../models/SerialNumber/SerialNumberModel';

import { ApiError } from '../../exceptions/ApiError';
import SerialNumberDataMapper from '../../dataMappers/SerialNumberDataMapper';


export default class SerialNumberService {
    private SerialNumberModel: Model<ISerialNumber>;

    constructor(SerialNumberModel: Model<ISerialNumber>) {
        this.SerialNumberModel = SerialNumberModel;
    }

    /** Calculates the next available serial number. */
    async getNextAvailableSerialNumber() {
        const SerialNumberDocument = await this.SerialNumberModel.findOne({}, {}, { sort: { value: -1 } });

        if (!SerialNumberDocument) {
            return 100000;
        }

        const { value } = SerialNumberDocument;

        let variablePart = String(value).slice(1);

        if (variablePart[0] === '0') {
            variablePart = String(+`1${variablePart}` + 1);
            variablePart = variablePart.slice(1);
        } else {
            variablePart = String(+variablePart + 1);
        }

        const nextSerialNumber = Number(`1${variablePart}`);

        return nextSerialNumber;
    }

    /** Adds the given serial number to the DB. */
    async createSerialNumber(serialNumber: ISerialNumber['value']) {
        if (await this.SerialNumberModel.findOne({ value: serialNumber })) {
            throw ApiError.BadRequest(null, 'The serial number already exists.');
        }

        const SerialNumberDocument = new this.SerialNumberModel({ value: serialNumber });
        await SerialNumberDocument.save();

        return SerialNumberDataMapper.toSerialNumber(SerialNumberDocument);
    }
}
