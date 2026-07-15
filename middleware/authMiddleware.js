const jwt=require("jsonwebtoken")
const authMiddleware=(req,res,next)=>{
    try{
        const token=req.header("Authorization")
        if(!token){
            return res.status(401).json({
                message:"Access denied. No Token provided"

            })

        }

        const actualToken=token.replace("Bearer ","")

        const decoded=jwt.verify(actualToken,process.env.JWT_SECRET)
        
        req.user=decoded
        next()

    }catch(error){
        return res.status(401).json({
            message:"Invalid Token"
        })
    }
}

module.exports=authMiddleware