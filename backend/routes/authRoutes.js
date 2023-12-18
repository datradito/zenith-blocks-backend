import siwe from "siwe";
import express from "express";
import { verifyController } from "../controller/authController.js";

const router = express.Router();

router.get("/nonce", function (_, res) {
  res.send(siwe.generateNonce());
});

router.post("/verify", verifyController);

export const authRouter = router;