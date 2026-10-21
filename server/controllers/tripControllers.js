const Trip = require('../models/Trip');
const createTrip = async function(req,res){
const {title, destination, startDate, endDate, description, rating} = req.body;
try{
const trip = await Trip.create({
    title:title,
    destination:destination,
    startDate:startDate,
    endDate:endDate,
    description:description,
    rating:rating,
    user:req.user._id
})
return res.status(201).json({message:"Trip Created Successfully",trip});
}
catch(err){
return res.status(500).json(
    {message:"Failed To Create Trip",
    error:err.message
    })
}
}
const getTrips = async function(req,res){
try{
const trips = await Trip.find({
user:req.user._id
})
return res.status(200).json({
    message: "Have a look at your Best memories",
    trips

})
}
catch(err){
    return res.status(500).json({
        message: "Failed to fetch trips",
        error:err.message
    })
}
}
const getTrip = async function(req,res){
try{
const trip = await Trip.findById(req.params.id);
if(!trip){
    return res.status(404).json({message: "No such trip exist"})
}
else{
if(trip.user.toString() === req.user._id.toString()){
return res.status(200).json({
    message: "Trip fetched successfully",
    trip
})
}
else{
    return res.status(403).json({
        message: "Unauthorised User"
    })
}
}
}
catch(err){
    return res.status(500).json({
        message:"Unexpected error occured",
        err:err.message
    })
}
}
const updateTrip = async function(req,res){
const {title, destination, startDate, endDate, description, rating} = req.body;
try{
const update = await Trip.findById(req.params.id);
if(!update){
return res.status(404).json({
message:"No such trip exists for updation"
})
}
else{
if(update.user.toString() === req.user._id.toString()){
    update.title = title;
    update.destination = destination;
    update.startDate = startDate;
    update.endDate = endDate;
    update.description = description;
    update.rating = rating;
    await update.save();
return res.status(200).json({
    message:" Trip Updated Successfully",
    update
})
}
else{
    return res.status(403).json({
        message: "Unauthorised User"
    })
}
}
}
catch(err){
    return res.status(500).json({
        message:"Unexpected error occured",
        error: err.message
    })
}
}
const deleteTrip = async function(req,res){
try{
const deleteuserTrip = await Trip.findById(req.params.id);
if(!deleteuserTrip){
return res.status(404).json({
message:"No such trip exists for deletion"
})
}
else{
if(deleteuserTrip.user.toString() === req.user._id.toString()){
await deleteuserTrip.deleteOne();
return res.status(200).json({
    message:" Trip Deleted Successfully",
    deleteuserTrip
})
}
else{
    return res.status(403).json({
        message: "Unauthorised User"
    })
}
}
}
catch(err){
    return res.status(500).json({
        message:"Unexpected error occured",
        error: err.message
    })
}
}
module.exports = {createTrip,getTrips,getTrip,updateTrip,deleteTrip};