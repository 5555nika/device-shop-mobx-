import { Router } from "express";
import { TypeController } from "../controllers/TypeController";
import checkRoleMiddleware from "../middleware/checkRoleMiddleware";

const router = Router()

router.post('/',checkRoleMiddleware('ADMIN'), TypeController.create)
router.get('/', TypeController.getAll)

export default router
