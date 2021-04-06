// Imports
import express from "express";
const router = express.Router();

// Routes //

// Get all stocks
router.get("/", (req, res) => {
    res.send("stocks");
});

export default router;
