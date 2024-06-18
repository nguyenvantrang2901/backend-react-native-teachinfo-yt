import express from "express"
import { userController, loginController } from "../controllers/userController.js"

//router object
const router = express.Router()

//register
router.post("/register", userController)
//login
router.post("/login", loginController)

// export
export default router
