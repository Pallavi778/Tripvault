require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const express = require('express');
const authRoutes = require('./routes/authRoutes');
const app = express();
app.use(cors({
  origin: 'http://localhost:5173'
}))
app.use(express.json());
const connectDB = async () =>{
    try{
       await mongoose.connect(process.env.MONGO_URI);
       console.log('MONGO DB connected successfully');
       app.listen(process.env.PORT,()=>{
       console.log(`Server running on Port ${process.env.PORT}`);
        })
    }
    catch(err){
        console.error('Mongo DB connection failed',err);
    }
};
connectDB();
app.use('/api/auth',authRoutes);