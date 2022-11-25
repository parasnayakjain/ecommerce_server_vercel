const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProduct, createReview, getAllReview } = require("../controllers/product");
const router = express.Router();
const authNormal = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

router 
  .route("/")
    .get((req,res)=>{
res.send("HelloWorld")});

router
  .route("/products")
   .get(getAllProducts)

router
  .route("/admin/product/:id")
   .put(authNormal, authAdmin, updateProduct)
   .delete(authNormal, authAdmin, deleteProduct)

router
  .route("/product/:id")
   .get(getProduct)

router
  .route("/admin/product")
   .post(authNormal, authAdmin, createProduct);

router
  .route("/review")
   .post(authNormal,createReview);

router
  .route("/allReviews")
   .get(authNormal,getAllReview);

module.exports = router;
