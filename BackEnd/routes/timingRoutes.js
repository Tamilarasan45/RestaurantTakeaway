const express = require("express");
const router = express.Router();
const { addTiming ,listAll,filled,editTiming,editDayAndTime} = require("../services/timingServices");


router.post("/add", addTiming);
router.get("/getAll",listAll);
router.post("/addFilled",filled);
router.post("/edittiming",editTiming);
router.post("/editTimingSlot",editDayAndTime);
module.exports = router;
