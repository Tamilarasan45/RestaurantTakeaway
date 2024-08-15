const mongoose = require('mongoose');
const Schema = mongoose.Schema


  

  const timingSchema = new Schema({
    day: {
      type: String,
      required: true,
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    },
    isAvailable:{type:Boolean,required:true},
    openTime:{type:String,required:true},
    closeTime:{type:String,required:true},
    threashold:{type:Number,required:true,default:15},
    fraction:{type:Number,required:true,default:15},
    slots: [{time:{type:String},isAvailable:{type:Boolean},total:{type:Number}}]
  });

const TimingModel = mongoose.model('Timing', timingSchema);

module.exports = TimingModel;
