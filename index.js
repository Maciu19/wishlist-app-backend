import dotenv from "dotenv"
import express from "express"
import bodyParser from "body-parser"
import cors from "cors";
import errorMiddleware from "./middleware/errorMiddleware.js"
import itemRouter from "./routes/itemRoutes.js";
import userRouter from "./routes/userRoutes.js";
import addressRouter from "./routes/userAddressRoutes.js";
import userDetailsRouter from "./routes/userDetailsRoutes.js";
import wishlistRouter from "./routes/wishlistRoutes.js";
import itemWishlistRouter from "./routes/itemWishlistRoutes.js";
import groupRouter from "./routes/groupRoutes.js";
import userGroupRouter from "./routes/userGroupsRoutes.js";
import userRegisterRouter from "./routes/userRegisterRoutes.js"
import userLoginRouter from "./routes/userLoginRoutes.js"
import groupWishlistRouter from "./routes/groupWishlistRoutes.js"
import purchasesRouter from "./routes/purchaseRoutes.js";
import notificationsRouter from "./routes/notificationRoutes.js";
import userLogoutRouter from "./routes/userLogoutRoutes.js";
import userProfileChange from "./routes/userChangeProfileRoutes.js";
import birdayChecker from "./utils/birthdayChecker.js";

dotenv.config();

const app = express();
app.use(bodyParser.json());

app.use(cors());
app.options('*', cors());

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.json({ message: "test ok" })
});

app.use("/register", userRegisterRouter);
app.use("/login", userLoginRouter);
app.use("/logout", userLogoutRouter);
app.use("/users", userRouter);
app.use("/updateProfile", userProfileChange)

app.use("/addresses", addressRouter);
app.use("/usersDetails", userDetailsRouter);

app.use("/items", itemRouter);
app.use("/wishlists", wishlistRouter);
app.use("/itemsWishlists", itemWishlistRouter);

app.use("/groups", groupRouter);
app.use("/usersGroups", userGroupRouter);
app.use("/wishlistsGroups", groupWishlistRouter);

app.use("/purchases", purchasesRouter);
app.use("/notifications", notificationsRouter)

app.use(errorMiddleware);

app.listen(port, "0.0.0.0", () => {
    console.log(`Example app listening at http://localhost:${port}`);
})

