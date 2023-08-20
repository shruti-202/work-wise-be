const express=require("express");
const router= express.Router();

router.get("/",(req,res)=>{
    res.send("Work Wise Backend");
})

module.exports= router;