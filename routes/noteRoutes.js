const express=require("express")
const router=express.Router()
const authMiddleware = require("../middleware/authMiddleware")
const {createNote,getAllNotes,updateNote,deleteNote}=require("../controllers/noteController")


router.post("/notes",authMiddleware,createNote)
router.get("/notes",authMiddleware,getAllNotes)
router.put("/notes/:id",authMiddleware,updateNote)
router.delete("/notes/:id",authMiddleware,deleteNote)
module.exports=router
