require("dotenv").config();
const express=require("express");
const mongoose=require("mongoose");
const healthRoutes=require("./routes/HealthRoutes");


/*Application*/
const app=express();
app.use(express.json());


/*Database*/
mongoose.connect(process.env.DATABASE_URL);
mongoose.connection.once("connected",()=>console.log("Database connected"));
mongoose.connection.on("error",(err)=>console.log("Database Error:",err))


/*Routes*/
app.use("/health",healthRoutes);


/*App Listen*/
app.listen(3000,()=>console.log("🟢 Application Started:3000 Port"))

