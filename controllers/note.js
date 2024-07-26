import noteSchema from "../models/note.js"


export const getNotes = async(req,res) => {
	try{
		const {username} = req.body
		const Notes = await noteSchema.find({author:username})
		res.status(200).json(Notes)
	}catch(err){
		res.status(500).json({message: err.message})
	}
}

export const createNote = async(req,res) => {
	try{
		const newNote = await noteSchema.create(req.body)
		res.status(201).json(newNote)
	}catch(err){
		res.status(500).json({message: err.message})
	}
}

export const editNote = async(req,res) => {
	try{
		
		const {id} = req.params
		const edited = await noteSchema.findByIdAndUpdate(id, req.body, {new: true})
		res.status(200).json(edited)
	}catch(err){
		res.status(500).json({message: err.message})
	}
}

export const deleteNote = async(req,res) => {
	try{
		
		const {id} = req.params
		await noteSchema.findByIdAndDelete(id)
		res.status(200).json({id: id})
	}catch(err){
		res.status(500).json({message: err.message})
	}
}
export const changeCategory = async(req,res) => {
	try{
		const {id} = req.params
		const {selectedCategory} = req.body
		const note = await noteSchema.findById(id)
		await note.updateOne({ $set: { category: selectedCategory }})
		res.status(200).json({id:id, category:selectedCategory})
	}catch(err){
		res.status(500).json({message: err.message})
	}
}

export const archiveNote = async(req,res) => {
	try{
		const {id} = req.params
		const {archived} = req.body
		const note = await noteSchema.findById(id)
		if(archived === true){
			await note.updateOne({ $set: { isArchived: true }})
			res.status(200).json({id:id, archived:true})
		}else{
			await note.updateOne({ $set: { isArchived: false }})
			res.status(200).json({id:id, archived:false})
		}
	}catch(err){
		res.status(500).json({message: err.message})
	}
}