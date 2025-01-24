import express from 'express';
import { getEquipments } from '../controllers/equipment.controller';

const equipmentRouter = express.Router();

equipmentRouter.get('/', getEquipments);

export default equipmentRouter;