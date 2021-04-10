import express from "express";
const app = express();

// Variables
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// ROUTES //
app.get("/", (req, res) => {
    res.send("Hello");
});

import stocksRouter from "./routes/stocks";
app.use("/stocks", stocksRouter);

app.listen(PORT, () => {
    console.log(`Server started on PORT: ${PORT}`);
});
