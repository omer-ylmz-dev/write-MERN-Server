import mongoose from "mongoose"

const NoteSchema = new mongoose.Schema({
	title:{
		type:String,
		require:true,
		trim:true
	},
	note:{
		type:String,
		require:true,
		trim:true
	},
	author:{
		type:String,
		trim:true
	},
	isArchived:{
		type:Boolean
	},
	category:{
		type:String,
		require:true
	}
},{timestamps:true})

const Note = mongoose.model("Note",NoteSchema)

export default Note