const func = require("../middleware/assyncError");
const Product = require("../models/product");
const ErrorHander = require("../utils/error");
const ApiFeatures =require("../utils/apiFeatures");

const createProduct = func(async (req, res, next) => {
    const product = await Product.create(req.body)
    res.status(201).json({
        sucess: true,
        product
    })


})
getAllProducts = func(async (req, res, next) => {
    const resultPerPage = 2;
    const productsCount = await Product.countDocuments();
  
    const apiFeature = new ApiFeatures(Product.find(), req.query)
      .search()
      .filter();
  
    let products = await apiFeature.query;
  
    let filteredProductsCount = products.length;

    var {page}=req.query;
    page=page?page:1;
    var finalProducts=[];
    var n=resultPerPage*(page-1)+filteredProductsCount;
    for(var i=resultPerPage*(page-1); i<resultPerPage*page && i<productsCount && i<n;i++)
     finalProducts.push(products[i]);

    res.status(200).json({
      success: true,
      finalProducts,
      productsCount,
      resultPerPage,
      filteredProductsCount,
    });
  });
const updateProduct = func(async (req, res, next) => {
    const id = req.params.id;
    let product = await Product.findById(id);
    if (!product)
        return next(new ErrorHander("Product not found", 404));

    product = await Product.findByIdAndUpdate(id, req.body,
        { new: true, runValidators: true, useFindAndModify: false });

    res.status(200).json({
        sucess: true,
        product
    })

})

const deleteProduct = func(async (req, res, next) => {
    const id = req.params.id;
    let product = await Product.findById(id);
    if (!product)
        return next(new ErrorHander("Product not found", 404));

    await product.remove();

    res.status(200).json({
        success: true,
        message: "product deleted succesfully"
    })
})

const getProduct = func(async (req, res, next) => {
    const id = req.params.id;
    let product = await Product.findById(id);
    if (!product)
        return next(new ErrorHander("Product not found", 404));


    res.status(200).json({
        success: true,
        product
    })
})

const createReview=func(async(req,res,next)=>{
    const{rating , comment,productId}=req.query;
    const name=req.user.name;
    const id=req.user._id;
    const review={
        user:id,
        name:name,
        rating:rating,
        comment:comment
    }
    const product=await Product.findById(productId);
    if(!product)
      return next( new ErrorHander("Please enter a valid product ID" , 404));
    
    var isCommentedBefore=false;
    
     product.reviews.forEach((review)=>{
        if(review.user.toString()===id.toString())
         isCommentedBefore=true;
    });

    if(isCommentedBefore)
    {
       product.reviews=product.reviews.filter((review)=>{
       return review.user.toString()!=id.toString()
       })
       product.reviews.push(review);
  
       var sum=0;
       product.reviews.forEach((review)=>{
        sum=sum+Number(review.rating);
       })

       var n=Number(product.numOfReviews);
       product.ratings=sum/(n);
    }
    else{
        product.reviews.push(review);
        product.numOfReviews=product.numOfReviews+1;
        var sum=0;
        product.reviews.forEach( (review)=>{
         sum=sum+Number(review.rating);
        
        })
        
        var n=Number(product.numOfReviews);
        product.ratings=sum/(n);
    }
    product.save();
    res.status(200).json({
        success:true,
        product
    })

})

const getAllReview=func(async(req,res,next)=>{
   const{productId}=req.query; 
   const product=await Product.findById(productId);
   if(!product)
    return next( new ErrorHander("Please enter a valid product ID" , 404));
   
   const reviews=product.reviews;
    res.status(200).json({
        success:true,
        reviews
    })

})

module.exports={createReview,createProduct,getAllProducts,
    updateProduct,deleteProduct,getProduct,getAllReview};
