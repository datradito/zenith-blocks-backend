const router= require("express").Router();
const siwe = require("siwe");

const { verifyController} = require('../controller/authController');

router.get("/nonce", function (_, res) {
  res.send(siwe.generateNonce());
});

router.post("/verify", verifyController);

module.exports = router;