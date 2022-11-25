const app = require("./app");
const dotenv = require("dotenv");
const cloudinary=require("cloudinary");
dotenv.config({ path: "server/config/config.env" });
const PORT = process.env.PORT;


app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
});
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
});
