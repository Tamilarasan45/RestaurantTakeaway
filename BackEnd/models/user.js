const mongoose = require('mongoose');
const Schema = mongoose.Schema
const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  mobilenum: { type: String, required: true },
  usertype: { type: String, enum: ["1","2"], default: "2" }
});

const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;
