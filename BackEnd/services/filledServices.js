const FilledModel = require("../models/filledSlots");

exports.addTiming= async (req, res) => {
  try {
    const { day,slot} = req.body;
    
    const timing = new FilledModel({
      day,
      slot
    });

    const savedDoc = await timing.save();
    console.log("time added successfully", savedDoc);
    res.status(200).json("time added successfully");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "An error occurred, please try again later." });
  }
};
 