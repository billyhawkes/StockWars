// Import
import express from "express";
const router = express.Router();

// Middleware
import { auth } from "../middleware";

// Controller
import UserController from "../controllers/UserController";

// Get your user info
router.get("/", auth, UserController.Profile);

// Leaderboard
// User Stock History
// User Owned Shares

export default router;
