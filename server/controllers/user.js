const func = require("../middleware/assyncError");
const User = require("../models/user");
const ErrorHander = require("../utils/error");
const setToken = require("../utils/setToken");
const cloudinary=require("cloudinary");


const registerUser = func(async (req, res, next) => {

    const { name, email, password,avatar } = req.body;
    var public_id="a";
    var url="https://www.freeiconspng.com/uploads/user-icon-png-person-user-profile-icon-20.png";
    
    if (avatar!="/Profile.png") {
        const myCloud = await cloudinary.v2.uploader.upload(avatar, {
            folder: "ecommerce",
            width: 150,
            crop: "scale",
        });
        public_id = myCloud.public_id,
        url = myCloud.secure_url
    }
    const user = await User.create({
        name:name, 
        email:email,
        password: password,
        avatar: {
            public_id: public_id,
            url: url
        }
        
    });
     next();
});

const login = func((async (req, res, next) => {
    const { email, password } = req.body;
    console.log(`1 ${req.body.email}`);
    if (!email || !password)
        return next(new ErrorHander("Enter Eamil and Password", 400));
    const user = await User.findOne({ email: email, password: password });

    if (!user)
        return next(new ErrorHander("Enter Valid Eamil and Password", 400));

        setToken(res, user);
    

}))

const logout = func((async (req, res, next) => {
    res.cookie("id", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
        sameSite: 'None',
        secure: true,
        overwrite: true
    });

    res.status(200).json({
        success: true,
        message: "Logged Out",
    });

}))

const updatePassword = func(async (req, res, next) => {
    const {newPassword, confirmPassword } = req.body;
    const { id } = req.cookies;
    if ( !newPassword  || !confirmPassword)
        return next(new ErrorHander("Ente Passwords", 400));
    if (newPassword != confirmPassword)
        return next(new ErrorHander("PLease eneter same Passwords", 400));

    const user = await User.findById(id);
    user.password = newPassword;
    user.save();
    res.status(200).json({
        success: "true",
        message: "updated succesfully"
    })




})

const updateProfile = func(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  if (req.body.avatar !== "") {
    const user = await User.findById(req.user.id);

    const imageId = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });

    newUserData.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    user,
    success: true,
  });
})

const getAllUsers=func((async (req,res,next)=>{
    const users= await User.find();
     

    res.status(200).json({
        sucess:true,
        users
    });
}))

const deleteMe=func((async(req,res,next)=>{
    const user=req.user;

    user.remove();
    res.status(200).json({
        sucess:true,
        message:"deleted succesfully"
    });

}))

const deleteUser=func((async(req,res,next)=>{
 
    const {id}=req.query;
    const user=await User.findById(id);
    if(!user)
       return next(new ErrorHander("PLease enter valid Id" , 404));
    
    user.remove();
    res.status(200).json({
        sucess:true,
        id:id,
        message:"deleted succesfully"
    });

}))

const getUserMe=func(async (req,res,next)=>{
    const user=req.user;

    res.status(200).json({
        sucess:"true",
        user
    })
})

const getUser=func(async(req,res,next)=>{
    const {id}=req.query;
    const user=await User.findById(id);
    if(!user)
       return next(new ErrorHander("PLease enter valid Id" , 404));

    res.status(200).json({
        sucess:true,
        user
    });

})

const updateRole=func(async(req,res,next)=>{
    const {id,role}=req.query;
    const user=await User.findById(id);
    if(!user)
       return next(new ErrorHander("PLease enter valid Id" , 404));
    
    user.role=role;
    user.save();

    res.status(200).json({
        success:true,
        message:`role updated to ${role}`
    })
})




module.exports = { registerUser, login, logout, updatePassword ,updateProfile,
                   getAllUsers,deleteMe,deleteUser,getUserMe,getUser,updateRole
};
