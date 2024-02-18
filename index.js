require("./db/config");
const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());
app.use(express.json());

app.use(require('./Api/itemsApi'));
app.use(require('./Api/usersApi'));
app.use(require('./Api/ordersApi'));
app.use(require('./Api/paymentRoutes'));

app.get(('/'),(req, resp)=>{
   resp.send("app is working")
});

app.listen(5000);