import express from 'express';
import { getLevels } from '../controllers/level.controller';

const levelRouter = express.Router();

levelRouter.get('/', getLevels);

export default levelRouter;