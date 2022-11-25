const func = require("../middleware/assyncError");
const User = require("../models/user");
const ErrorHander = require("../utils/error");


const authNormal= func(async(req,res,next)=>{
   const { id } = req.cookies;
  
   if(!id)
     return next(new ErrorHander("Please login",404));
     
   const user=await User.findById(id);
   if(!user)
     return next(new ErrorHander("Please login",404));
    req.user=user; 
    next();
});

module.exports=authNormal;