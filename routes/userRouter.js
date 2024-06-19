import express from "express"
import { userController, loginController, getUserProfileController, logoutController } from "../controllers/userController.js"
import { isAuth } from "../middlewares/authMiddleware.js"

//router object
const router = express.Router()

//register
router.post("/register", userController)
//login
router.post("/login", loginController)
//get user profile
router.get("/profile", isAuth, getUserProfileController)
//logout
router.get("/logout", isAuth, logoutController)
// export
export default router
