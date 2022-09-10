import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const getAll = async () => {
    const usersInGroups = await prisma.userInGroup.findMany(
        {
            include: {
                user: true,
                group: true
            }
        }
    );
    return usersInGroups;
}

const getUserInGroup = async (id) => {
    const usersInGroup = await prisma.userInGroup.findUnique({
        where: {
            id
        },
        include: {
            user: true,
            group: true
        }
    })
    return usersInGroup;
}

const getOwnerInGroup = async (groupId) => {
    const usersInGroup = await prisma.userInGroup.findFirst({
        where: {
            AND: [
                {
                    group: {
                        id: groupId
                    }
                },
                { isOwner: true }
            ]
        },
        include: {
            user: true,
            group: true
        }
    })
    return usersInGroup;
}

const addUserInGroup = async (info) => {
    const usersInGroup = await prisma.userInGroup.create({
        data: { ...info },
        include: {
            user: true,
            group: true
        }
    })
    return usersInGroup;
}

const updateUserInGroup = async (id, info) => {
    const usersInGroup = await prisma.userInGroup.update({
        where: {
            id
        },
        data: { ...info },
        include: {
            user: true,
            group: true
        }
    })
    return usersInGroup;
}


const deleteUserInGroup = async (id) => {
    const usersInGroup = await prisma.userInGroup.delete({
        where: {
            id
        },
        include: {
            user: true,
            group: true
        }
    })
    return usersInGroup;
}

export default { getAll, getUserInGroup, getOwnerInGroup, addUserInGroup, updateUserInGroup, deleteUserInGroup };