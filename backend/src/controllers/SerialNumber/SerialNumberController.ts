import { NextFunction } from 'express';

import {
    GetNextAvailableSerialNumberRequest,
    GetNextAvailableSerialNumberResponse
} from './types';
import SerialNumberModel from '../../models/SerialNumber/SerialNumberModel';
import SerialNumberService from '../../services/SerialNumber/SerialNumberService';


class SerialNumberController {
    /** Determines what the next available serial number. */
    async getNextAvailableSerialNumber(
        _req: GetNextAvailableSerialNumberRequest,
        res: GetNextAvailableSerialNumberResponse,
        next: NextFunction
    ) {
        try {
            const serialNumberService = new SerialNumberService(SerialNumberModel);
            const nextSerialNumber = await serialNumberService.getNextAvailableSerialNumber();

            res.json(nextSerialNumber);
        } catch (e) {
            next(e);
        }
    }
}


export default new SerialNumberController();
