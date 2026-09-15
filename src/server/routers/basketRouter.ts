import { Router } from "express";
import { BasketController } from "../controllers/BasketController";
import authMiddleware from "../middleware/authMiddleware";

const router = Router()

router.post('/', authMiddleware, BasketController.addBasket)
router.get('/', authMiddleware, BasketController.getBasket)
router.delete('/:deviceId', authMiddleware, BasketController.removeDevice)
router.delete('/', authMiddleware, BasketController.clearBasket)

export default router
