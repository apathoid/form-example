import { NextFunction } from 'express';
import { validationResult } from 'express-validator';

import {
    CreateVINRequest,
    CreateVINResponse,
    GetVINEntriesRequest,
    GetVINEntriesResponse
} from './types';
import SerialNumberModel from '../../models/SerialNumber/SerialNumberModel';
import SerialNumberService from '../../services/SerialNumber/SerialNumberService';
import VINModel from '../../models/VIN/VINModel';
import VINService from '../../services/VIN/VINService';

import { ApiError } from '../../exceptions/ApiError';


class VINController {
    async getVINEntries(_req: GetVINEntriesRequest, res: GetVINEntriesResponse, next: NextFunction) {
        try {
            const vinService = new VINService(VINModel);
            const VINEntries = await vinService.getVINEntries();

            res.json(VINEntries);
        } catch (e) {
            next(e);
        }
    }

    async createVIN(req: CreateVINRequest, res: CreateVINResponse, next: NextFunction) {
        try {
            const result = validationResult(req);

            if (!result.isEmpty()) {
                next(ApiError.BadRequest(result.array()));
                return;
            }

            const serialNumberService = new SerialNumberService(SerialNumberModel);
            const vinService = new VINService(VINModel);

            await serialNumberService.createSerialNumber(req.body.serialNumber);
            const VIN = await vinService.createVIN(req.body);

            res.json(VIN);
        } catch (e) {
            next(e);
        }
    }
}


export default new VINController();
