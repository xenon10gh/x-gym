import { PrismaClient } from "@prisma/client";
import exercises from "./exercises.json";
import * as exerciseSpecs from "./schema.json";
import { connect } from "http2";

const prisma = new PrismaClient();

async function main() {
    await createLevels();
    await createEquipments();
    await createBodyParts();
    await createCategories();
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
    await prisma.level.createMany({
        data: levels
    });
}

async function createEquipments() {
    const equipments = exerciseSpecs.properties.equipment.enum.map(equipment => {
        return {
            name: equipment
        }
    });
    console.log(equipments);
    await prisma.equipment.createMany({
        data: equipments
    });
}

async function createBodyParts() {
    const bodyParts = exerciseSpecs.properties.primaryMuscles.items[0].enum.map(bodyPart => {
        return {
            name: bodyPart
        }
    });
    console.log(bodyParts);
    await prisma.bodyPart.createMany({
        data: bodyParts
    });
}

async function createCategories() {
    const categories = exerciseSpecs.properties.category.enum.map(category => {
        return {
            name: category
        }
    });
    console.log(categories);
    await prisma.category.createMany({
        data: categories
    });
}


async function createExercises() {
    console.log(Array.isArray(exercises));
    console.log(exercises.length);
    for (const exercise of exercises) {
        console.log(exercise);
        let exerciseLevel = await prisma.level.findUnique({
            where: {
                name: exercise.level
            }
        });
        if (!exerciseLevel) {
            throw new Error("Level not found");
        }
        let exerciseEquipment = await prisma.equipment.findUnique({
            where: {
                name: exercise.equipment || "none"
            }
        });
        if (!exerciseEquipment) {
            throw new Error("Equipment not found");
        }
        let exerciseBodyParts = await prisma.bodyPart.findMany({
            where: {
                name: {
                    in: [...(exercise.primaryMuscles || []), ...(exercise.secondaryMuscles || [])],
                },
            },
        });
        let exerciseCategory = await prisma.category.findUnique({
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
                    }
                })
            },
            images: exercise.images?.length ? {
                    create: exercise.images.map(image => {
                        return {
                            url: "public/" + image
                        }
                    })
                } : undefined,
        }

        await prisma.exercise.create({
            data: exerciseData
        });
    }
}


main()
    .catch(e => {
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect()
    })