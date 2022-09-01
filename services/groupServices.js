import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const getAll = async () => {
    const groups = await prisma.group.findMany();
    return groups;
}

const getGroup = async (id) => {
    const group = await prisma.group.findUnique({
        where: {
            id
        }
    })
    return group;
}

const addGroup = async (groupInfo) => {
    const group = await prisma.group.create({
        data: { ...groupInfo }
    });
    return group;
}

const updateGroup = async (id, groupInfo) => {
    const group = await prisma.group.update({
        where: {
            id
        },
        data: { ...groupInfo }
    })
    return group;
}

const deleteGroup = async (id) => {
    const group = await prisma.group.delete({
        where: {
            id
        }
    })
    return group;
}

export default { getAll, getGroup, addGroup, updateGroup, deleteGroup }