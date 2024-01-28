import { Router } from 'express';

import { SerialNumberController } from '../controllers/SerialNumber';


const router = Router();

router.post('/', SerialNumberController.getNextAvailableSerialNumber);


export default router;
