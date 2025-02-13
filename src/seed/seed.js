"use strict";
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
    });
}
function createEquipments() {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
function createBodyParts() {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
function createCategories() {
    return __awaiter(this, void 0, void 0, function* () {
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
