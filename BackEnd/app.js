const express = require("express");
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const port = 2000;
const connectDB = require('./config/database');
connectDB();
// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes

const foodRoutes = require('./routes/foodRoutes');
const userRoutes = require('./routes/userroutes');
const filledRoutes = require('./routes/filledRoutes');
app.use("/filled", filledRoutes);
app.use("/food", foodRoutes);

const timingRoutes = require('./routes/timingRoutes');
app.use("/time", timingRoutes);
app.use("/user", userRoutes);
app.get('/', (req, res) => {
  res.status(200).json("Hello world");
});

// Start the server
app.listen(port, () => {
  console.log(`This application is working on port ${port}`);
});
