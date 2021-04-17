// Imports
import express from "express";
const router = express.Router();

// Middleware
import { auth } from "../middleware";

// Controller
import StockController from "../controllers/StockController";

// Routes //
router.get("/price/:q", StockController.PriceOfStock);
router.post("/buy", auth, StockController.Buy);
router.post("/sell", auth, StockController.Sell);

export default router;
