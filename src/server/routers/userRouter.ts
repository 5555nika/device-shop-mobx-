import { Router } from "express";
import { UserController } from "../controllers/UserController";
import authMiddleware from "../middleware/authMiddleware";

export const router = Router()

router.post('/registration', UserController.registration)
router.post('/login', UserController.login)
router.get('/auth', authMiddleware, UserController.check)

export default router
