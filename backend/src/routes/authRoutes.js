import express from "express";
import { verifySafeUserController } from "../controller/auth/authController.js";

const router = express.Router();

router.post("/verify_safe_user", verifySafeUserController);

export const authRouter = router;
