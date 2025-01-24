import { PrismaClient, Category } from '@prisma/client';

const prisma = new PrismaClient();

class CategoryModel {

    static async getCategories(filter: any = {}): Promise<Category[]> {
        return await prisma.category.findMany({
            where: filter
        });
    }

    static async getById(id: string): Promise<Category | null> {
        return await prisma.category.findUnique({
            where: {
                id: id
            }
        });
    }

}

export default CategoryModel;