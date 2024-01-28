import { Router } from 'express';

import VINRouter from './VINRouter';
import SerialNumberRouter from './SerialNumberRouter';


const router = Router();


router.use('/vin', VINRouter);
router.use('/serial', SerialNumberRouter);


export default router;
