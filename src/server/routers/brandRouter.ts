import { Router } from "express";
import { BrandController } from "../controllers/BrandController";
import checkRoleMiddleware from "../middleware/checkRoleMiddleware";

const router = Router()

router.post('/', checkRoleMiddleware('ADMIN'), BrandController.create)
router.get('/', BrandController.getAll)

export default router
