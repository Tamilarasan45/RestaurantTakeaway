const mongoose = require('mongoose');
const Schema = mongoose.Schema


  

  const filledSchema = new Schema({
    day: {
      type: String,
      required: true,
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    },
    slots: {type:String,required:true}
  });

const FilledModel = mongoose.model('Filled', filledSchema);

module.exports = FilledModel;