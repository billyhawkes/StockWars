// Imports
import express from "express";
const router = express.Router();

// Middleware
import { auth } from "../middleware";

// Controller
import AuthController from "../controllers/AuthController";

// Routes //
router.post("/login", AuthController.Login);
router.post("/register", AuthController.Register);
router.get("/", auth, AuthController.UserContext);

export default router;
