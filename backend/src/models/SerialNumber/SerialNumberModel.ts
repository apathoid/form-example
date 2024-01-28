import mongoose, { Schema } from 'mongoose';


export interface ISerialNumber {
    id: string;
    value: number;
}

const SerialNumberSchema = new Schema<ISerialNumber>({
    value: { type: Number, required: true, unique: true },
});

const SerialNumberModel = mongoose.model('SerialNumber', SerialNumberSchema);


export default SerialNumberModel;
