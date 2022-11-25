const express=require("express");
const cookieParser=require("cookie-parser");
const app=express();
const product=require("./routes/products")
const user=require("./routes/user");
const order=require("./routes/order");
const bodyParser=require("body-parser");
const fileUpload=require("express-fileupload");
const connectDB=require("./database/connect");
const errorHandler = require("./middleware/error");
const cors=require("cors");
const corsOptions ={
    origin:true, 
    credentials:true,           
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());
app.use("/api/v1",product);
app.use("/api/v1",user);
app.use("/api/v1",order);
app.use(errorHandler);
connectDB();
module.exports=app
