import { Request, Response } from 'express';

import EquipmentModel from '../models/equipment.model';

export const getEquipments = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name } = req.query;
        const filters: any = {};

        if (name) filters.name = { contains: name as string, mode: 'insensitive' };

        const equipments = await EquipmentModel.getEquipments(filters);
        res.status(200).json(equipments);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}