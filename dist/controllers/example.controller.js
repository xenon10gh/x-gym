"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createExample = exports.getExamples = void 0;
const getExamples = (req, res) => {
    res.status(200).json({ message: 'Obteniendo todos los ejemplos parte 2' });
};
exports.getExamples = getExamples;
const createExample = (req, res) => {
    const { name, description } = req.body;
    res.status(201).json({
        message: 'Ejemplo creado exitosamente',
        example: { id: Date.now(), name, description },
    });
};
exports.createExample = createExample;
