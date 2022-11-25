const app = require("./server/app");
const dotenv = require("dotenv");
const cloudinary=require("cloudinary");
dotenv.config({ path: "server/config/config.env" });
const PORT = process.env.PORT;
const express = require("express");
const app2=express();

app.get("/",(req,res)=>{
    res.send("Go To /api/v1/ routes to access backend")
})
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
});
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
});
