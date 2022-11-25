const func = require("../middleware/assyncError");
const ErrorHander = require("../utils/error");

const authAdmin=func(async (req,res,next)=>{
  
    const user=req.user;
    if(!user)
     return next(new ErrorHander("Please Login To access this resource",404));

    if(user.role!="admin")
     return next(new ErrorHander("Only admin are allowed to access this route"));
    
    next();
});

module.exports=authAdmin;