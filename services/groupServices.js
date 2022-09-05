import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const getAll = async () => {
    const groups = await prisma.groupsOfUsers.findMany();
    return groups;
}

const getGroup = async (name) => {
    const group = await prisma.groupsOfUsers.findUnique({
        where: {
            name
        },
        include: {
            userInGroup: true,
            groupWishlist: true
        }
    })
    return group;
}

const addGroup = async (groupInfo) => {
    const group = await prisma.groupsOfUsers.create({
        data: { ...groupInfo }
    });
    return group;
}

const updateGroup = async (name, groupInfo) => {
    const group = await prisma.groupsOfUsers.update({
        where: {
            name
        },
        data: { ...groupInfo }
    })
    return group;
}

const deleteGroup = async (name) => {
    const group = await prisma.groupsOfUsers.delete({
        where: {
            name
        }
    })
    return group;
}

export default { getAll, getGroup, addGroup, updateGroup, deleteGroup }