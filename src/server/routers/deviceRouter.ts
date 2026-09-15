import { Router } from "express";
import { DeviceController } from "../controllers/DeviceController";
import checkRoleMiddleware from "../middleware/checkRoleMiddleware";

const router = Router()

router.post('/', checkRoleMiddleware('ADMIN'), DeviceController.create)
router.get('/', DeviceController.getAll)
router.get('/:id', DeviceController.getOne)

export default router
