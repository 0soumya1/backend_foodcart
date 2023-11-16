const express = require("express");
const app = express();
const router = express.Router();

const cors = require("cors");
app.use(cors());
app.use(express.json());

const orders = require("../db/ordersModel");

router.get("/orders", async (req, resp) => {
  let result = await orders.find();
  resp.send(result);
});

router.get("/orders/:_id", async (req, resp) => {
  // console.log(req.params, "params1");
  let result = await orders.findOne(req.params);
  resp.send(result);
});

router.get("/userOrders/:_id", async (req, resp)=>{
  // console.log(req.params, "params");
  let result = await orders.find({userId: req.params});
  resp.send(result);
})

router.post("/addOrder", async (req, resp) => {
  // console.log(req.body, "req.body")
  let orderList = await orders.find();
  let orderKey = "ORDER_" + (orderList.length + 1);
  let obj = {...req.body, orderId: orderKey}
  let result = await new orders(obj).save();
  resp.send(result);
});

module.exports = router;
