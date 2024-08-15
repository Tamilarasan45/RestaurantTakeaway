const express = require("express");
const router = express.Router();
const { addTiming } = require("../services/filledServices");


router.post("/add", addTiming);


module.exports = router;
