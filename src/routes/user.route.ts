import express from 'express';
import { getUserById, getUserByAuth0Id } from '../controllers/user.controller';

const userRouter = express.Router();

userRouter.get('/:id', getUserById);
userRouter.get('/auth0/:auth0Id', getUserByAuth0Id);

export default userRouter;