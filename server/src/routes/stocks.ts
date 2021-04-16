// Imports
import express from "express";
const router = express.Router();

// Middleware
import { auth } from "../middleware/authMiddleware";

// Controller
import stockController from "../controllers/stockController";

// Routes //
router.get("/history", auth, stockController.History);
router.get("/shares", auth, stockController.Shares);
router.get("/price/:q", stockController.PriceOfStock);
router.post("/buy", auth, stockController.Buy);
router.post("/sell", auth, stockController.Sell);

export default router;
