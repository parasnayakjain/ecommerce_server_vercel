const mongoose=require("mongoose");
const dotenv=require("dotenv");
dotenv.config({path:"server/config/config.env"});

const connectDB=()=>{
mongoose.connect(process.env.DB)
 .then(()=>{console.log("connectedToDB")})
 .catch((err)=>{console.log(err)})
}

module.exports=connectDB;