import express from "express";
const app = express();

// Variables
const PORT = process.env.PORT || 5000;

// ROUTES //
app.get("/", (req, res) => {
    res.send("Hello");
});

app.listen(PORT, () => {
    console.log(`Server started on PORT: ${PORT}`);
});
