import dotenv from "dotenv"
import express from "express"
import bodyParser from "body-parser"
import errorMiddleware from "./middleware/errorMiddleware.js"
import itemRouter from "./routes/itemRoutes.js";
import userRouter from "./routes/userRoutes.js";
import addressRouter from "./routes/userAddressRoutes.js";
import userDetailsRouter from "./routes/userDetailsRoutes.js";

dotenv.config();

const app = express();
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.json({ message: "test ok" })
});

app.use("/items", itemRouter);
app.use("/users", userRouter);
app.use("/address", addressRouter);
app.use("/userDetails", userDetailsRouter);

app.use(errorMiddleware);

app.listen(port, "0.0.0.0", () => {
    console.log(`Example app listening at http://localhost:${port}`);
})

