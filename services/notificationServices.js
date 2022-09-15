import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const getAll = async () => {
    const notifications = await prisma.notification.findMany({
        include: {
            user: true
        }
    });
    return notifications;
}

const getNotification = async (id) => {
    const notification = await prisma.notification.findUnique({
        where: {
            id
        },
        include: {
            user: true
        }
    })
    return notification;
}

const addNotification = async (info) => {
    const notification = await prisma.notification.create({
        data: { ...info }
    });
    return notification;
}

const updateNotification = async (id, info) => {
    const notification = await prisma.notification.update({
        where: {
            id
        },
        data: { ...info }
    })
    return notification;
}

const deleteNotification = async (id) => {
    const notification = await prisma.notification.delete({
        where: {
            id
        }
    })
    return notification;
}

export default { getAll, getNotification, addNotification, updateNotification, deleteNotification }