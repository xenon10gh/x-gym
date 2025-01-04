import { Request, Response } from 'express';

export const getExamples = (req: Request, res: Response): void => {
  res.status(200).json({ message: 'Obteniendo todos los ejemplos parte 2' });
};

export const createExample = (req: Request, res: Response): void => {
  const { name, description } = req.body;
  res.status(201).json({
    message: 'Ejemplo creado exitosamente',
    example: { id: Date.now(), name, description },
  });
};
