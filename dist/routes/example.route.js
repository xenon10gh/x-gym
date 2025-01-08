"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const example_controller_1 = require("../controllers/example.controller");
const router = (0, express_1.Router)();
// Rutas para obtener y crear "examples"
router.get('/', example_controller_1.getExamples);
router.post('/', example_controller_1.createExample);
exports.default = router;
