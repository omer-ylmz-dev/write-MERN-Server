import userSchema from "../models/user.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"



export const register = async(req,res) => {
	try{
		const {email,username,passw,isAgreed} = req.body
		const mailCheck = await userSchema.findOne({email: email})
		const userCheck = await userSchema.findOne({username: username})
		
		
		
		if(mailCheck){
			return res.status(203).json({message: "This mail address is already use"})
		}
		if(!isEmailAddress(email)){
			return res.status(203).json({message: "This mail address is incorrect"})
		}
		if(userCheck){
			return res.status(203).json({message: "This username already exists"})
		}
		if(!isCorrectPassword(passw)){
			return res.status(203).json({message: "Password must contain one digit from 1 to 9, one lowercase letter, one uppercase letter, no space, and it must be 8-16 characters long"})
		}
		if(isAgreed === false){
			return res.status(203).json({message: "Please agree with our terms"})
		}
		const passHash = await bcrypt.hash(passw,12)
		const userLogin = await userSchema.create({email,username,passw:passHash,isAgreed})
		const token = jwt.sign({id: userLogin._id}, process.env.JWT_SECRET, {expiresIn: "1h"})
		
		
		res.status(201).json({
			status: "OK",
			userLogin,
			token
		})
	}catch(err){
		return res.status(500).json({message: err.message})
	}
}

export const login = async(req,res) => {
	try{
		
		const {email,passw} = req.body
		const userLogin = await userSchema.findOne({email: email})
		
		if(!userLogin){
			return res.status(203).json({message: "Invalid mail address or password"})
		}
		const passComparing = await bcrypt.compare(passw, userLogin.passw)
		
		if(!passComparing){
			return res.status(203).json({message: "Invalid mail address or password"})
		}
		
		const token = jwt.sign({id: userLogin._id}, process.env.JWT_SECRET, {expiresIn: "1h"}) 
		
		res.status(200).json({
			status: "OK",
			userLogin,
			token
		})
	}catch(err){
		return res.status(500).json({message: err.message})
	}
}

function isEmailAddress(mailAddress){
	let regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
	
	if(mailAddress.match(regex)) return true
	else return false
}



function isCorrectPassword(checkPassword){
	let regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?!.* ).{8,16}$/;
	
	if(checkPassword.match(regex)) return true
	else return false
}