const express = require("express");
const { createOrder, getAllOrders, myOrder, orderById, changeStatus } = require("../controllers/order");
const router = express.Router();
const authNormal = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

router
 .route("/order/new")
  .post(authNormal,createOrder)

router
 .route("/admin/order/:id")
   .get(authNormal, authAdmin , orderById)
   .put(authNormal,authAdmin,changeStatus)

router
  .route("/admin/allOrders")
   .get(authNormal, authAdmin , getAllOrders);
   
router
  .route("/orders")
   .get(authNormal , myOrder)

module.exports=router;