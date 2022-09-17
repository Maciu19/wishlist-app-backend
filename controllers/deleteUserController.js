import userServices from "../services/userServices.js"
import userDetailsServices from "../services/userDetailsServices.js";
import userAddressServices from "../services/userAddressServices.js";
import itemServices from "../services/itemServices.js";
import itemWishlistServices from "../services/itemWishlistServices.js";
import wishlistServices from "../services/wishlistServices.js";
import groupWishlistServices from "../services/groupWishlistServices.js";
import userGroupsServices from "../services/userGroupsServices.js";
import groupServices from "../services/groupServices.js";
import purchaseServices from "../services/purchaseServices.js";
import notificationServices from "../services/notificationServices.js";

const deleteUser = async (req, res, next) => {
    try {
        const user = await userServices.getUserEmail(req.user.user.email);
        if (!user) {
            throw { message: "No user found" };
        }

        //! delete userDetails
        await userDetailsServices.deleteUserDetails(user.userDetails.id);

        //! delete userAddress
        await userAddressServices.deleteAddress(user.userDetails.userAddressId);

        //! delete all wishlists, all items created, all items inside wishlist
        const wishlists = user.wishlist;
        for (let wishlist of wishlists) {
            let itemsInWishlist = wishlist.itemWishlist;

            //! delete items created by user, items added wishlists, purchases 
            for (let itemInWishlist of itemsInWishlist) {
                let itemId = itemInWishlist.itemId;

                let purchases = itemInWishlist.purchase;
                for (let purchase of purchases) {
                    await purchaseServices.deletePurchase(purchase.id);
                }

                await itemWishlistServices.deleteItemsInWishlist(itemInWishlist.id);
                await itemServices.deleteItem(itemId);
            }

            let wishlistInGroups = wishlist.groupWishlist;

            //! delete all wishists shared in groups
            for (let wishlistInGroup of wishlistInGroups) {
                await groupWishlistServices.deleteGroupWishlist(wishlistInGroup.id);
            }

            //! delete wishlist
            await wishlistServices.deleteWishlist(wishlist.id);
        }

        //! delete groups 
        //  --> owner = delete the group
        //  --> member = delete from the list
        const groups = user.userInGroup;
        for (let group of groups) {
            let groupId = group.groupId;
            let isOwner = group.isOwner;

            await userGroupsServices.deleteUserInGroup(group.id);
            if (isOwner === true) {
                groupServices.deleteGroup(groupId);
            }
        }

        //! delete notification
        const notifications = user.notification;
        for (let notification of notifications) {
            await notificationServices.deleteNotification(notification.id);
        }

        await userServices.deleteUser(user.email);

        res.json({ message: "Delete succefully" })
    } catch (err) {
        console.error("Error while deleting one user");
        next(err);
    }
}

export default { deleteUser };