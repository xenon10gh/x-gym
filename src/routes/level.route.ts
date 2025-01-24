import express from 'express';
import { getLevels, createLevel } from '../controllers/level.controller';

const levelRouter = express.Router();

levelRouter.get('/', getLevels);
levelRouter.post('/', createLevel);

export default levelRouter;