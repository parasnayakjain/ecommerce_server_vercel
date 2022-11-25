const func = require("../middleware/assyncError");
const Order=require("../models/order")
const Product = require("../models/product");
const ErrorHander = require("../utils/error");

const createOrder = func(async (req, res, next) => {
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id,
    });

    res.status(201).json({
        sucess:true,
        order
    })
});

const myOrder=func(async(req,res,next)=>{
    const order=await Order.find({user:req.user._id});
    res.status(200).json({
        success:true,
        order
    });

});
const orderById=func(async(req,res,next)=>{
     const order=await Order.findById(req.params.id);
     res.status(200).json({
        success:true,
        order
    });
})

const getAllOrders=func(async(req,res,next)=>{
    const orders=await Order.find();
    var sum=0;
    orders.forEach((order)=>{
        sum=sum+Number(order.totalPrice);
    })
    res.status(200).json({
        success:true,
        NetTotal:sum,
        orders
    });

});

const changeStatus=func(async(req,res,next)=>{
    const{id}=req.params;
    const { status}=req.body;
    const order=await Order.findById(id);
    
    if(order.orderStatus.toString()==="Delivered")
      return next(new ErrorHander("Already Delivered" , 404));
    
    order.orderItems.forEach(async (order)=>{
       await updateStock(order.product , order.quantity);
    })

    order.orderStatus=status;
    order.save();
    res.status(200).json({
        sucess:true,
        status,
        order
    })
});

async function updateStock(id , quantity){
  const product=await Product.findById(id);
  product.stock=Number(product.stock)-Number(quantity);
  product.save();

}

module.exports={createOrder , myOrder,getAllOrders, orderById,changeStatus}