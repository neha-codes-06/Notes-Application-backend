const express=require("express")
const dotenv=require("dotenv")
const connectToMongodB=require("./config/db")
const cors=require("cors")

const app=express()
dotenv.config()
connectToMongodB()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get("/",(req,res)=>{
    res.send("Server is running")
})
const authRoutes=require("./routes/authRoutes")
app.use("/",authRoutes)

const noteRoutes=require("./routes/noteRoutes")
app.use("/",noteRoutes)
const PORT=8000;


app.listen(PORT,()=>{
    console.log(`Server is running at Port ${PORT}`)

})