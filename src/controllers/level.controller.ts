import { Request, Response } from 'express';

import LevelModel from '../models/level.model';

export const getLevels = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name } = req.query;
        const filters: any = {};

        if (name) filters.name = { contains: name as string, mode: 'insensitive' };

        const levels = await LevelModel.getLevels(filters);
        res.status(200).json(levels);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};