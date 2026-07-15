const Note=require("../models/noteModel")
const createNote=async(req,res)=>{
    try{
        const {title,content}=req.body
        
        const note=await Note.create({
            title,
            content,
            user:req.user.userId,
        })
        res.status(201).json({
            message:"Note created successfully",note
        })
    }
    catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}

const getAllNotes=async(req,res)=>{
    try{
        const notes=await Note.find({
            user:req.user.userId
        })
        res.status(200).json(notes)
    }catch(error){
        res.status(500).json({
              message:error.message
            
        })
    }

}

const updateNote=async(req,res)=>{
    try{
        const {title,content}=req.body
        const note=await Note.findOneAndUpdate({
            _id:req.params.id,
            user:req.user.userId
        },
    {
        title,
        content
    },
    {
        new:true
    }
);
if(!note){
    return res.status(404).json({
        message:"Note not found"
    })
}
res.status(200).json({
    message:"Note updated successfully",note
})

    }
    catch(error){
        res.status()
    }
}
const deleteNote=async (req,res)=>{
    try{
        const note=await Note.findOneAndDelete({
            _id:req.params.id,
            user:req.user.userId

        })
        if(!note){
    return res.status(404).json({
        message:"Note not found"
    })
}
res.status(200).json({
    message:"Note deleted successfully"
})


    }catch(error){
        res.status(500).json({
            message:error.message
        })

    }
}
module.exports={
    createNote,
    getAllNotes,
    updateNote,
    deleteNote,



}