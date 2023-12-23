const express =require("express");
const { connection } = require("./db");
const userRouter = require("./Routes/User.routes");
const authMiddleware = require("./Middleware/authentication.middleware");
const blogRouter = require("./Routes/Blog.routes");
const adminRouter = require("./Routes/Admin.routes");
require("dotenv").config()
const cors=require ("cors");

const app=express()
const PORT=process.env.PORT || 5000

app.use(express.json())
app.use(cors())

app.use("/user",userRouter)
app.use(authMiddleware)
app.use("/admin",adminRouter)
app.use("/blog",blogRouter)

app.listen(PORT,async ()=>{
    try {
        await connection
        console.log("Cnnected to DB");
        console.log(`Server is running on port ${PORT}`);

    } catch (error) {
        console.log(error);
    }
})
