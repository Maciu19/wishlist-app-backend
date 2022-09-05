import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const getAll = async () => {
    const items = await prisma.item.findMany();
    return items;
}

const getItem = async (id) => {
    const item = await prisma.item.findUnique({
        where: {
            id
        },
        include: {
            itemWishlist: true
        }
    })
    return item;
}

const addItem = async (itemInfo) => {
    const item = await prisma.item.create({
        data: { ...itemInfo }
    });
    return item;
}

const updateItem = async (id, itemInfo) => {
    const item = await prisma.item.update({
        where: {
            id
        },
        data: { ...itemInfo }
    })
    return item;
}

const deleteItem = async (id) => {
    const item = await prisma.item.delete({
        where: {
            id
        }
    })
    return item;
}

export default { getAll, getItem, addItem, updateItem, deleteItem }