// Import
import express from "express";
const router = express.Router();

// Middleware
import { auth } from "../middleware";

// Controller
import UserController from "../controllers/UserController";

// Get your user info
router.get("/", auth, UserController.Profile);
router.get("/history", auth, UserController.History);
router.get("/shares", auth, UserController.Shares);
router.get("/leaderboard", UserController.Leaderboard);

// Leaderboard

export default router;
