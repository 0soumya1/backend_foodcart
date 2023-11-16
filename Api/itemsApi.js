const express = require("express");
const app = express();
const router = express.Router();

const cors = require("cors");
app.use(cors());
app.use(express.json());

const items = require('../db/itemsModel');

router.post("/addItem", async(req, resp)=>{
  let result = await new items(req.body).save();
  resp.send(result);
});

router.get('/items', async(req, resp)=>{
  let result = await items.find();
  resp.send(result);
});

router.get("/items/:_id", async (req, res) => {
  let result = await items.findOne(req.params);
  res.send(result);
});

module.exports = router;