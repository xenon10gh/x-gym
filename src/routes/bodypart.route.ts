import express from 'express';
import { getBodyParts, createBodyPart, updateBodyPartName } from '../controllers/bodypart.controller';

const bodyPartRouter = express.Router();

bodyPartRouter.get('/', getBodyParts);
bodyPartRouter.post('/', createBodyPart);
bodyPartRouter.put('/:id', updateBodyPartName);

export default bodyPartRouter;