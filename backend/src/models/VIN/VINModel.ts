import mongoose, { Schema } from 'mongoose';


export interface IVIN {
    id: string;
    version: number;
    equipmentCode: string;
    issueYear: number;
    serialNumber: number;
    productionPlace: string;
}

const VINSchema = new Schema<IVIN>({
    version: { type: Number, required: true },
    equipmentCode: { type: String, required: true },
    issueYear: { type: Number, required: true },
    serialNumber: { type: Number, required: true, unique: true },
    productionPlace: { type: String, required: true },
});

const VINModel = mongoose.model('VIN', VINSchema);


export default VINModel;
