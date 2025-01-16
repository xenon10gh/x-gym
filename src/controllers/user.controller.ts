import { Request, Response } from 'express';

import UserModel from '../models/user.model';

export const getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const user = await UserModel.getById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getUserByAuth0Id = async (req: Request, res: Response): Promise<void> => {
    try {
        const { auth0Id } = req.params;
        const user = await UserModel.getByAuth0Id(auth0Id);
        res.status(200).json(user);
    } catch {
        res.status(500).json({ message: 'Internal server error' });
    }
}