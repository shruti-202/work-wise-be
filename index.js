require("dotenv").config();
const express=require("express");
const mongoose=require("mongoose");
const cors = require("cors");
const healthRoutes=require("./routes/HealthRoutes");
const authRoutes=require("./routes/AuthRoutes");


/*Application*/
const app=express();
app.use(express.json());
 app.use(cors({
    credentials:true,
    origin:["https://workwisee.netlify.app/"]
 }));


/*Database*/
mongoose.connect(process.env.DATABASE_URL);
mongoose.connection.once("connected",()=>console.log("Database connected"));
mongoose.connection.on("error",(err)=>console.log("Database Error:",err))


/*Routes*/
app.use("/health",healthRoutes);
app.use("/api/v1/auth",authRoutes)


/*App Listen*/
app.listen(3000,()=>console.log("🟢 Application Started:3000 Port"))


