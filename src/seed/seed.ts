import { PrismaClient } from "@prisma/client";
import * as exercises from "./exercises.json";
import * as exerciseSpecs from "./schema.json";

const prisma = new PrismaClient();

async function main() {
    await createLevels();
    await createEquipments();
    await createBodyParts();
    await createCategories();
    await createExerciseImages();
    await createExercises();
    console.log("Data seeded successfully");
}


async function createLevels() {
    const levels = exerciseSpecs.properties.level.enum.map(level => {
        return {
            name: level
        }
    });
    console.log(levels);
    // await prisma.level.createMany({
    //     data: levels
    // });
}

async function createEquipments() {
    const equipments = exerciseSpecs.properties.equipment.enum.map(equipment => {
        return {
            name: equipment
        }
    });
    console.log(equipments);
    // await prisma.equipment.createMany({
    //     data: equipments
    // });
}

async function createBodyParts() {
    const bodyParts = exerciseSpecs.properties.primaryMuscles.items[0].enum.map(bodyPart => {
        return {
            name: bodyPart
        }
    });
    console.log(bodyParts);
    // await prisma.bodyPart.createMany({
    //     data: bodyParts
    // });
}

async function createCategories() {
    const categories = exerciseSpecs.properties.category.enum.map(category => {
        return {
            name: category
        }
    });
    console.log(categories);
    // await prisma.category.createMany({
    //     data: categories
    // });
}

async function createExerciseImages() {

}

async function createExercises() {
    
}

main()
    .catch(e => {
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect()
    })