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

const getNotificationsActive = async () => {
    const notifications = await prisma.notification.findMany({
        where: {
            isActive: true
        },
        include: {
            user: true
        }
    })
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
        data: { ...info },
        include: {
            user: true
        }
    });
    return notification;
}

const updateNotification = async (id, info) => {
    const notification = await prisma.notification.update({
        where: {
            id
        },
        data: { ...info },
        include: {
            user: true
        }
    })
    return notification;
}

const deleteNotification = async (id) => {
    const notification = await prisma.notification.delete({
        where: {
            id
        },
        include: {
            user: true
        }
    })
    return notification;
}

export default { getAll, getNotificationsActive, getNotification, addNotification, updateNotification, deleteNotification }