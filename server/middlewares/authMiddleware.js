const jwt = require('jsonwebtoken');
const User = require('../models/User');
const protect = async(req,res,next)=>{
    let token;
      if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
          token = req.headers.authorization.split(' ')[1];
          const decoded = jwt.verify(token , process.env.JWT_SECRET);
          req.user = await User.findById(decoded.id).select('-password');
          // Attach the authenticated user to req.user so protected controllers can identify the user making the request.
          // and also we don't need that our password is also visible along with other info so we did select('-password)
              if(!req.user){
                return res.status(401).json({message: 'Unauthorised, User Not Found'})
              }
          next();
        }
        catch(err){
           return res.status(401).json({message: 'Invalid Credentials'})
        }
      }
     if(!token){
        return res.status(401).json({message: 'Unauthorised User'});
     }
}
module.exports = {protect};