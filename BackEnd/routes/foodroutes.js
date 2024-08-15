const express = require("express");
const router = express.Router();
const { getFood, addFood, test , editFood,listAll } = require("../services/foodServices");


router.post("/addFood", addFood);
router.get("/test", test);
router.post("/editFood",editFood);
router.get("/listAll",listAll);

module.exports = router;
