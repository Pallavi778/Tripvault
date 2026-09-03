const User = require('../models/User');
require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const register = async(req,res)=>{
    try{
    const{name,email,password} = req.body;
    const user = await User.findOne({email});
    if(!user){
        const hashedPassword = await bcrypt.hash(password,10);
        const newuser = await User.create({
            name:name,
            email:email,
            password:hashedPassword
        })
        return res.status(201).json({message:"User Registered Successfully"})
    }
    else{
        return res.status(409).json({message:"User already exists"});
    }
    }
    catch(err){
       return res.status(500).json({
       message: "Server error"
});
    }
}
const login = async(req,res)=>{
    try{
    const{email,password} = req.body;
    const validUser = await User.findOne({email});
    if(!validUser){
        return res.status(404).json({
            message:'User Not Found'
        })
    }
    else{
    const matchPassword = await bcrypt.compare(password,validUser.password);
    if(!matchPassword){
        return res.status(401).json({
            message:"Invalid Credentials"
        })
    }
    else{
        const token = jwt.sign({id:validUser._id},process.env.JWT_SECRET,{expiresIn:'10d'});
        return res.status(200).json({
        message: "Login successful",
        token: token
        });
    }
    }
}
    catch(err){
        return res.status(500).json({
            message:"Server Error"
        })
    }
}
const profile = async (req, res) => {
    res.status(200).json({
        user: req.user
    });
};
module.exports={register,login,profile};