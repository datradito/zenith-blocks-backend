import siwe from "siwe";
import express from "express";
import {
  verifyController,
  verifySafeUserController,
} from "../controller/auth/authController.js";

const router = express.Router();

router.get("/nonce", function (_, res) {
  res.send(siwe.generateNonce());
});

router.post("/verify", verifyController);
router.post("/verify_safe_user", verifySafeUserController);

export const authRouter = router;
