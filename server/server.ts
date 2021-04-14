// Imports
import cors from "cors";
import express from "express";
const app = express();

// Variables
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(cors());

// ROUTES //
app.get("/", (req, res) => {
    res.send("Hello");
});

import stocksRouter from "./routes/stocks";
app.use("/stocks", stocksRouter);
import authRouter from "./routes/auth";
app.use("/auth", authRouter);

app.listen(PORT, () => {
    console.log(`Server started on PORT: ${PORT}`);
});
