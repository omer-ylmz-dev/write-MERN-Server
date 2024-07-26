import express from "express"

const router = express.Router()

import {register,login} from "../controllers/user.js"


router.post("/login",login);
router.post("/register",register);

export default router