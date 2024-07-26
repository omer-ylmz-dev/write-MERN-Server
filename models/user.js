import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
	username:{
		type:String,
		require:true,
		trim:true
	},
	email:{
		type:String,
		require:true,
		unique:true
	},
	passw:{
		type:String,
		require:true
	},
	isAgreed:{
		type:Boolean
	}
},{timestamps:true})


const User = mongoose.model("User",UserSchema)

export default User