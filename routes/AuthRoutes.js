const express= require("express");
const router= express.Router();
const {registerUser}=require("../controller/AuthController");
const {loginUser}=require("../controller/AuthController");

router.post("/register",registerUser)
router.post("/login",loginUser)

module.exports= router;