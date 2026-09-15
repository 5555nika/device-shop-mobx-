import { Router } from "express";
import userRouter  from './userRouter.ts'
import typeRouter from './typeRouter.ts'
import brandRouter from './brandRouter.ts'
import deviceRouter from './deviceRouter.ts'
import basketRouter from './basketRouter.ts'

const router = Router()


router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/brand', brandRouter)
router.use('/device', deviceRouter)
router.use('/basket', basketRouter)

export default router
