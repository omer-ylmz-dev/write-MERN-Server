import mongoose from "mongoose"


const dbConnection = () => {
	mongoose.connect(process.env.MONGO_URI).then(()=>{
		console.log("MONGODB Connected")
	}).catch((err)=>{
		console.log(err)
	})
}

export default dbConnection