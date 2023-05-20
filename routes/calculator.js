const express = require("express");

const router = express.Router();

const userAuthentication = require("../middlewares/auth");

const calculatorController = require("../controllers/calculator");
router.post(
  "/post-result",
  userAuthentication.authenticate,
  calculatorController.postResult
);

router.get(
  "/get-result",
  userAuthentication.authenticate,
  calculatorController.getResult
);

router.delete(
  `/delete-result/:calcId`,
  userAuthentication.authenticate,
  calculatorController.deleteResult
);

module.exports = router;
