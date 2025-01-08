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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const exercises_json_1 = __importDefault(require("./exercises.json"));
const exerciseSpecs = __importStar(require("./schema.json"));
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // await createLevels();
        // await createEquipments();
        // await createBodyParts();
        // await createCategories();
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
        yield prisma.level.createMany({
            data: levels
        });
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
        yield prisma.equipment.createMany({
            data: equipments
        });
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
        yield prisma.bodyPart.createMany({
            data: bodyParts
        });
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
        yield prisma.category.createMany({
            data: categories
        });
    });
}
function createExercises() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        console.log(Array.isArray(exercises_json_1.default));
        console.log(exercises_json_1.default.length);
        for (const exercise of exercises_json_1.default) {
            console.log(exercise);
            let exerciseLevel = yield prisma.level.findUnique({
                where: {
                    name: exercise.level
                }
            });
            if (!exerciseLevel) {
                throw new Error("Level not found");
            }
            let exerciseEquipment = yield prisma.equipment.findUnique({
                where: {
                    name: exercise.equipment || "none"
                }
            });
            if (!exerciseEquipment) {
                throw new Error("Equipment not found");
            }
            let exerciseBodyParts = yield prisma.bodyPart.findMany({
                where: {
                    name: {
                        in: [...(exercise.primaryMuscles || []), ...(exercise.secondaryMuscles || [])],
                    },
                },
            });
            let exerciseCategory = yield prisma.category.findUnique({
                where: {
                    name: exercise.category
                }
            });
            if (!exerciseCategory) {
                throw new Error("Category not found");
            }
            let exerciseData = {
                name: exercise.name,
                levelId: exerciseLevel.id,
                equipmentId: exerciseEquipment.id,
                categoryId: exerciseCategory.id,
                instructions: exercise.instructions.join("\n"),
                bodyParts: {
                    connect: exerciseBodyParts.map(bodyPart => {
                        return {
                            id: bodyPart.id
                        };
                    })
                },
                images: ((_a = exercise.images) === null || _a === void 0 ? void 0 : _a.length) ? {
                    create: exercise.images.map(image => {
                        return {
                            url: "public/" + image
                        };
                    })
                } : undefined,
            };
            yield prisma.exercise.create({
                data: exerciseData
            });
        }
    });
}
main()
    .catch(e => {
    throw e;
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
