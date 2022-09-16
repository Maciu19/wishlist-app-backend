import schedule from "node-schedule"
import dateUTC from "./dateUTC.js";
import usersDetailsServices from "../services/userDetailsServices.js";
import userServices from "../services/userServices.js";
import groupServices from "../services/groupServices.js";
import notificationServices from "../services/notificationServices.js";

const birdayChecker = schedule.scheduleJob("0 0 * * *", async () => {
    const users = await usersDetailsServices.getAllUserDetails();

    let currentDay = new Date();
    currentDay = dateUTC(currentDay);

    for (let user of users) {
        let userDetailsDob = user.dob;

        if ((userDetailsDob.getMonth() === currentDay.getMonth()) && (userDetailsDob.getDate() === currentDay.getDate())) {

            let userInfo = await userServices.getUserEmail(user.user.email);
            let userGroups = userInfo.userInGroup;

            let usersToNotificate = [];
            for (let group of userGroups) {
                let groupInfo = await groupServices.getGroup(group.groupId);
                let usersInGroups = groupInfo.userInGroup;

                for (let userInGroup of usersInGroups) {
                    if (userInGroup.userId !== userInfo.id) {
                        if (!usersToNotificate.includes(userInGroup.userId)) {
                            usersToNotificate.push(userInGroup.userId);
                        }
                    }
                }
            }

            for (let userToNotificate of usersToNotificate) {
                await notificationServices.addNotification({
                    category: "EVENT",
                    details: `Today is ${userInfo.username} birthday !`,
                    user: {
                        connect: {
                            id: userToNotificate
                        }
                    }
                })
            }

            await notificationServices.addNotification({
                category: "EVENT",
                details: "Happy Birthday!",
                user: {
                    connect: {
                        id: userInfo.id
                    }
                }
            })
        }
    }

})

export default birdayChecker;
