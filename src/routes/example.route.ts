import { Router } from 'express';
import { getExamples, createExample } from '../controllers/example.controller';

const router = Router();

// Rutas para obtener y crear "examples"
router.get('/', getExamples);
router.post('/', createExample);

export default router;
