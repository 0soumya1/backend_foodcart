const express = require("express");
const app = express();
const router = express.Router();

const cors = require("cors");
app.use(cors());
app.use(express.json());

const users = require("../db/usersModel");

const Jwt = require("jsonwebtoken");
const jwtKey = "e-comm";

router.post("/signUp", async (req, resp) => {
  let result = await new users(req.body).save();
  result = result.toObject();
  delete result.password 
  // resp.send(result);
  Jwt.sign({result}, jwtKey, {expiresIn:"4h"}, (err, token)=>{
    if(err){
     resp.send({result:"something went wrong"});
    }
     resp.send({result, auth:token});
   })
});

router.post("/login", async (req, resp) => {
    // console.log(req.body);
    if(req.body.name && req.body.password){ 
        let user = await users.findOne(req.body).select("-password");
        if(user){
        //  resp.send(user)
         Jwt.sign({user}, jwtKey, {expiresIn:"4h"}, (err, token)=>{
          if(err){
           resp.send({result:"something went wrong"});
          }
           resp.send({user, auth:token});
         })
        }else{
          resp.send({result:"no user found"});
        }
    }else{
        resp.send({result:"no user found"});   
    }
});

module.exports = router;
