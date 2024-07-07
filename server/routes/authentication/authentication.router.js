const express = require("express");
const {
  login,
  signUp,
} = require("../../controller/authentication/authentication.controller");
const router = express.Router();

router.route("/login").post(login);

router.route("/signUp").put(signUp);

module.exports = router;
