const {registerUser,login,logout, updatePassword,updateProfile, getAllUsers,
      deleteMe, deleteUser, getUserMe, getUser, updateRole}=require("../controllers/user");
const express = require("express");
const authNormal = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
const router = express.Router();

router
 .route("/registerUser")
   .post(registerUser,login)
router
  .route("/login")
   .post(login);

router
  .route("/logout")
   .get(logout);

router
  .route("/updatePassword")
   .post(authNormal, updatePassword);

router
  .route("/admin/getAllUsers")
    .get(authNormal,authAdmin,getAllUsers);


router
  .route("/user")
    .delete(authNormal,deleteMe)
    .get(authNormal,getUserMe)
    .put(authNormal , updateProfile)

router
  .route("/admin/user")
    .delete(authNormal,authAdmin,deleteUser)
    .get(authNormal,authAdmin,getUser)
    .post(authNormal,authAdmin,updateRole);

module.exports=router;
