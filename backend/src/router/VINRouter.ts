import { Router } from 'express';
import { body } from 'express-validator';

import { VINPatternValidator } from '../models/VIN';
import { VINController } from '../controllers/VIN';


const router = Router();

router.get('/', VINController.getVINEntries);

router.post(
    '/',
    body('version').matches(VINPatternValidator.pattern.version),
    body('equipmentCode').matches(VINPatternValidator.pattern.equipmentCode),
    body('issueYear').matches(VINPatternValidator.pattern.issueYear),
    body('serialNumber').matches(VINPatternValidator.pattern.serialNumber),
    body('productionPlace').matches(VINPatternValidator.pattern.productionPlace),
    VINController.createVIN
);


export default router;
