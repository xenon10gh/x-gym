"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const exerciseSpecs = __importStar(require("./schema.json"));
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield createLevels();
        yield createEquipments();
        yield createBodyParts();
        yield createCategories();
        yield createExerciseImages();
        yield createExercises();
        console.log("Data seeded successfully");
    });
}
function createLevels() {
    return __awaiter(this, void 0, void 0, function* () {
        const levels = exerciseSpecs.properties.level.enum.map(level => {
            return {
                name: level
            };
        });
        console.log(levels);
        // await prisma.level.createMany({
        //     data: levels
        // });
    });
}
function createEquipments() {
    return __awaiter(this, void 0, void 0, function* () {
        const equipments = exerciseSpecs.properties.equipment.enum.map(equipment => {
            return {
                name: equipment
            };
        });
        console.log(equipments);
        // await prisma.equipment.createMany({
        //     data: equipments
        // });
    });
}
function createBodyParts() {
    return __awaiter(this, void 0, void 0, function* () {
        const bodyParts = exerciseSpecs.properties.primaryMuscles.items[0].enum.map(bodyPart => {
            return {
                name: bodyPart
            };
        });
        console.log(bodyParts);
        // await prisma.bodyPart.createMany({
        //     data: bodyParts
        // });
    });
}
function createCategories() {
    return __awaiter(this, void 0, void 0, function* () {
        const categories = exerciseSpecs.properties.category.enum.map(category => {
            return {
                name: category
            };
        });
        console.log(categories);
        // await prisma.category.createMany({
        //     data: categories
        // });
    });
}
function createExerciseImages() {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
function createExercises() {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
main()
    .catch(e => {
    throw e;
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
