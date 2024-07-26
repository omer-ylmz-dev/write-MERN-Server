import express from "express"

const router = express.Router()

import {getNotes,createNote,editNote,deleteNote,changeCategory,archiveNote} from "../controllers/note.js"

router.post("/getNotes",getNotes);
router.post("/createNote",createNote);
router.patch("/editNote/:id",editNote);
router.delete("/deleteNote/:id",deleteNote);
router.put("/changeCategory/:id",changeCategory);
router.put("/archiveNote/:id",archiveNote);

export default router