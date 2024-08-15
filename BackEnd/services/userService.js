require('dotenv').config({path:'./JwtToken.env'});
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require("../models/user");
const app = express();
app.use(express.json());
exports.login = async (req, res) => {
    try {
        console.log(req.body)
        const user = await userModel.findOne({email: req.body.email});
        console.log(user);
        if (!user) {
            return res.status(404).send('User not found');
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(400).send('Invalid credentials');
        }
        const secretKey = process.env.SECRET_KEY;
        console.log(secretKey);
        const token = jwt.sign({ id: user.username }, secretKey, { expiresIn: '5m' });
        console.log(token);
        console.log('Loggedin Successfully')
        user_type=user.usertype;
        res.status(200).send({ token,user_type});
    } catch (error) {
        res.status(500).send('Server error');
    }
};

exports.addUser = async (req, res) => {
    try {
        var { username, email, password, mobilenum} = req.body;
        console.log(req.body);
        const check_user = await userModel.findOne({email: req.body.email});
        if(!check_user || check_user==undefined){
        const salt = await bcrypt.genSalt(10);
        var password = await bcrypt.hash(req.body.password, salt);
        console.log(password);
        const user = new userModel({
            username,
            email,
            password,
            mobilenum
        });
    
        const savedDoc = await user.save();
        console.log("User added successfully", savedDoc);
        res.status(200).send('Account Created');
    }
    else{
        return res.status(404).send('emailId already exists');
    }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "An error occurred while adding the user, please try again." });
    }
};
