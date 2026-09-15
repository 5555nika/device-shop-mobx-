import type { NextFunction, Request, Response   } from "express"
import { ApiError } from "../error/ApiError"
import { Type } from "../models/models"

export class TypeController {
    static async create (req: Request,  res: Response, next: NextFunction) {
        try {
            const { name } = req.body
            const type = await Type.create({ name })
            return res.json(type)
        } catch (error) {
            console.log(error)
            return next(ApiError.badRequest('Ошибка при создании типа'))
        }
    }

    static async getAll (req: Request, res: Response, next: NextFunction) {
        try {
            const types = await Type.findAll()
            return res.json(types)
        } catch (error) {
            console.log(error)
            next(ApiError.badRequest('Ошибка при получении типов'))
        }
    }
}
