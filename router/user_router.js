import { Router } from "express";
import { login, register } from "../controller/user_controller.js";
import { authenticate_token, role_auth } from "../middleware/auth.js";
import { USER_ROLES } from "../utils/constant.js";

const router = Router()

router.post("/register",authenticate_token,role_auth([USER_ROLES.ADMIN,USER_ROLES.MANAGER]),register)
router.post("/login",login)


export {router}