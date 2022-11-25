const setToken=(res,user)=>{
const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    sameSite: 'None',
    secure: true
  };
 // console.log(options);
 res.status(200).cookie("id" , `${user._id}`,options).json({
  status:"True",
  user

 })    
 return;
}

module.exports=setToken;
