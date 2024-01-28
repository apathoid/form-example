import { HydratedDocument } from 'mongoose';

import { ISerialNumber } from '../models/SerialNumber/SerialNumberModel';


export default class SerialNumberDataMapper {
    /** Removes all DB related properties from the model. */
    static toSerialNumber(SerialNumberModel: HydratedDocument<ISerialNumber>) {
        const serialNumber: ISerialNumber = {
            id: SerialNumberModel._id.toString(),
            value: SerialNumberModel.value
        };

        return serialNumber;
    }
}
