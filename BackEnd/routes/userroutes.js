const express = require("express");
const router = express.Router();
const { login,addUser} = require("../services/userService");

router.post("/login", login);
router.post("/addUser", addUser);
module.exports = router;
