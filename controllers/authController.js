const User=require("../models/userModel")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")

const registerUser=async (req,res)=>{
    try{
        const {name ,email,password}=req.body
        const existingUser=await User.findOne({
            email
        })
        if(existingUser){
            return res.send("Email already registered")
        }
        const hashedPassword=await bcrypt.hash(password,10)
        const user=await User.create({
            name,
            email,
            password:hashedPassword
    })
    res.status(201).json({
        message:"User registered successfully",user,
    })
}

    catch(error){
        res.send(error.message)
    }
}


const  loginUser=async (req,res)=>{
    try{
        const {password}=req.body
        const user=await User.findOne({
            email:req.body.email
        })
        if(!user){
            return res.send("User not found")
        }
        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.send("invalid Password")
        }
        const token=jwt.sign(
            {
                userId:user._id
            },
            process.env.JWT_SECRET
        );
        res.status(200).json({
            message:"Login Successful",token
        })

     
        



    }
    catch(error){
        res.send(error.message)
    }

}
module.exports={
    registerUser,
     loginUser


}