// Imports
import express from "express";
import cors from 'cors';
const app = express();
import dotenv from "dotenv";
dotenv.config({ path: __dirname + "/./../.env" });

// Variables
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());

// ROUTES //
app.get("/", (req, res) => {
    res.send("Hello");
});

import stocksRouter from "./routes/stocks";
app.use("/stocks", stocksRouter);
import authRouter from "./routes/auth";
app.use("/auth", authRouter);
import usersRouter from "./routes/users";
app.use("/users", usersRouter);

app.listen(PORT, () => {
    console.log(`Server started on PORT: ${PORT}`);
});
