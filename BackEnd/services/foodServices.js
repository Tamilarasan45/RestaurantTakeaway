const FoodModel = require("../models/food"); 

exports.addFood = async (req, res) => {
  try {
    const { foodName, foodType, foodDesc, foodPrice, foodAllergiens, foodStatus } = req.body;
    const food = new FoodModel({
      foodName,
      foodType,
      foodDesc,
      foodPrice,
      foodAllergiens,
      foodStatus
    });

    const savedDoc = await food.save();
    console.log("Food added successfully", savedDoc);
    res.status(200).json({"Message":"Food Added Successfuly","Data":savedDoc});;
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "An error occurred, please try again later." });
  }
};

exports.editFood = async (req, res) => {
  try {
    let foodId= req.body._id;
    const { foodName, foodType, foodDesc, foodPrice, foodAllergiens, foodStatus } = req.body;
    const updatedData = {
      foodName,
      foodType,
      foodDesc,
      foodPrice,
      foodAllergiens,
      foodStatus
    };

    const savedDoc = await FoodModel.findByIdAndUpdate(foodId,updatedData,{new:true})
    console.log("Food added successfully", savedDoc);
    res.status(200).json("Food added successfully");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "An error occurred, please try again later." });
  }
};

exports.listAll = async (req, res) => {
  try {
    let allFood=await FoodModel.find({});
    res.status(200).json(allFood);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "An error occurred, please try again later." });
  }
};

exports.test = async (req, res) => {
  try {
    let foodId= req.body._id;
    const {foodName, foodType, foodDesc, foodPrice, foodAllergiens, foodStatus } = req.body;
    const food = await FoodModel.findById(foodId);
    if (!food) {
      return res.status(404).json({ message: "Food item not found" });
    }
    food.foodName = foodName;
    food.foodType = foodType;
    food.foodDesc = foodDesc;
    food.foodPrice = foodPrice;
    food.foodAllergiens = foodAllergiens;
    food.foodStatus = foodStatus;
    const updatedFood = await food.save();

    res.status(200).json(updatedFood);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred, please try again later." });
  }
};
