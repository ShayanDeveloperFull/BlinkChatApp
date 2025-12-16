import express from "express";
import { signUp, login, logout, updateProfile, checkAuth } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js"

const router = express.Router()

router.post("/signUp", signUp)

router.post("/login", login)

router.post("/logout", logout)

router.put("/update-profile", protectRoute, updateProfile)

router.get("/checkAuth", protectRoute, checkAuth)

export default router;


