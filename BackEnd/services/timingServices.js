const TimingModel = require("../models/timings"); 
const FilledModel = require("../models/filledSlots"); 

exports.addTiming= async (req, res) => {
  try {
    const { day,isAvailable , openTime,closeTime,threashold,fraction} = req.body;
    let timeslots=generateTimeSlots(openTime,closeTime,fraction);
    let slotDetails=[];
     for (let i in timeslots){
      let slotDetail = {
        time: timeslots[i],     
        isAvailable: true,      
        total: 1                
    };
    slotDetails.push(slotDetail);
     }
     console.log("slotdetails",slotDetails)
    const timing = new TimingModel({
      day,
      isAvailable,
      openTime,
      closeTime,
      threashold,
      fraction,
      slots:slotDetails
    });

    const savedDoc = await timing.save();
    console.log("time added successfully", savedDoc);
    res.status(200).json("time added successfully");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "An error occurred, please try again later." });
  }
};
 


exports.listAll = async (req, res) => {
  try {
    let allTimings=await TimingModel.find({});
    res.status(200).json(allTimings);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "An error occurred, please try again later." });
  }
};


exports.editTiming= async (req, res) => {
  try {
    let timeId= req.body._id;
    const { day,isAvailable , openTime,closeTime,threashold,fraction} = req.body;
    let timeslots=generateTimeSlots(openTime,closeTime,fraction);
    let slotDetails=[];
     for (let i in timeslots){
      let slotDetail = {
        time: timeslots[i],     
        isAvailable: true,      
        total: 1                
    };
    slotDetails.push(slotDetail);
     }
    const updatedTiming ={
      day,
      isAvailable,
      openTime,
      closeTime,
      threashold,
      fraction,
      slots:slotDetails
    }
    const savedDoc = await TimingModel.findByIdAndUpdate(timeId,updatedTiming,{new:true})
    console.log("Time updated successfully", savedDoc);
    res.status(200).json("Time updated successfully");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "An error occurred, please try again later." });
  }
};


const generateTimeSlots = (startTime, endTime, intervalMinutes) => {
  let slots = [];
  let start = new Date(`2022-01-01T${startTime}:00Z`); 
  let end = new Date(`2022-01-01T${endTime}:00Z`); 
  while (start < end) {
      
      let slot = start.toISOString().substring(11, 16);
      slots.push(slot);
      
      
      start.setMinutes(start.getMinutes() + intervalMinutes);
  }
  return slots;
  
};


exports.filled= async (req, res) => {
  try {
    const { day,slots} = req.body;
    
    const timing = new FilledModel({
      day,
      slots
    });

    const savedDoc = await timing.save();
    console.log("time added successfully", savedDoc);
    res.status(200).json("time added successfully");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "An error occurred, please try again later." });
  }
};
 
exports.editDayAndTime= async (req, res) => {
  try {
    console.log(req.body)
    const { timingId, time, newTotal } = req.body;
    const result = await TimingModel.findOneAndUpdate(
      { "_id": timingId, "slots.time": time },
      { "$set": { "slots.$.total": newTotal } },
      { new: true }
  );
   if(result){
    console.log("Time updated successfully", result);
  }
    res.status(200).json("Time updated successfully");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "An error occurred, please try again later." });
  }
};