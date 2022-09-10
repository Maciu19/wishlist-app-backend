import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const getAll = async () => {
    const groups = await prisma.groupsOfUsers.findMany({
        include: {
            userInGroup: true,
            groupWishlist: true
        }
    });
    return groups;
}

const getGroup = async (id) => {
    const group = await prisma.groupsOfUsers.findUnique({
        where: {
            id
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
        data: { ...groupInfo },
        include: {
            userInGroup: true,
            groupWishlist: true
        }
    });
    return group;
}

const updateGroup = async (id, groupInfo) => {
    const group = await prisma.groupsOfUsers.update({
        where: {
            id
        },
        data: { ...groupInfo },
        include: {
            userInGroup: true,
            groupWishlist: true
        }
    })
    return group;
}

const deleteGroup = async (id) => {
    const group = await prisma.groupsOfUsers.delete({
        where: {
            id
        },
        include: {
            userInGroup: true,
            groupWishlist: true
        }
    })
    return group;
}

export default { getAll, getGroup, addGroup, updateGroup, deleteGroup }