const router= require("express").Router();
const siwe = require("siwe");

const { siweController, verifyController} = require('../controller/authController');

router.get("/nonce", function (_, res) {
  res.send(siwe.generateNonce());
});

router.post("/siwe", siweController);
router.post("/verify", verifyController);

module.exports = router;