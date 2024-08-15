const mongoose = require('mongoose')
const Schema = mongoose.Schema

const foodSchema = new Schema({
  date: { type: String, required: true, default: Date.now },
  foodName: { type: String, required: true },
  foodType: { type: String, required: true },
  foodDesc: { type: String, required: true },
  foodPrice: { type: Number, required: true },
  foodAllergiens:{type:String, required: true},
  foodStatus: { type: String, required: true,default: "draft"}
})

const FoodModel = mongoose.model('Food', foodSchema)
module.exports = FoodModel
