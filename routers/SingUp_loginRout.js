const express=require("express");
const {createSingup,getUser,login}=require("../Controller/SingUp_login");
const {auth}=require("../middleware/auth")

const SingUpRout=express.Router();

SingUpRout.post("/SingUp",createSingup);
SingUpRout.get("/SingUp",getUser)
SingUpRout.post("/login",auth,login,(req,res)=>{
    res.status(200).json({
      sucess:true,
        message:"login success"
    })
});

// exports.router=router;
module.exports=SingUpRout;



