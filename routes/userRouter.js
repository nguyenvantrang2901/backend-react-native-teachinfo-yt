import express from "express"
import { userController } from "../controllers/userController.js"

//router object
const router = express.Router()

//register
router.post("/register", userController)

// export
export default router
