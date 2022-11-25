const mongoose=require("mongoose");

const productSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter product name"]
    },
    description:{
        type:String,
        required:[true,"Please enter product desciption"]
    },
    price:{
        type:Number,
        required:[true,"PLease enter price"]
    },
    ratings:{
        type:Number,
        default:0
    },
    images:[{
        public_id:{
            type:String,
            required:true
        },
        image_url:{
             type:String,
             required:true
        }
    }],
    category:{
        type:String,
        required:[true,"Please enter product category"]
    },
    stock:{
        type:Number,
        default:0
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[{
        user: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true,
          },
        name:{
            type:String,
                
        },
        rating:{
            type:Number,
            
        },
        comment:{
            type:String,
            
        }
   
    }],
    createdAt:{
        type:Date,
        default:Date.now
    }

});

const Product =mongoose.model("Product" , productSchema);
module.exports=Product;