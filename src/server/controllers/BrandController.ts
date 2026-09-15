import type { NextFunction, Request, Response } from "express";
import { Brand } from "../models/models";
import { ApiError } from "../error/ApiError";

export class BrandController {
    static async create (req: Request, res: Response, next: NextFunction) {
        try {
            const { name } = req.body
            const brand = await Brand.create({ name })
            return res.json(brand)
        } catch (error) {
            console.log(error)
            return next(ApiError.badRequest('Ошибка при создании бренда'))
        }
    }

    static async getAll (req: Request, res: Response, next: NextFunction) {
        try {
            const brands = await Brand.findAll()
            return res.json(brands)
        } catch (error) {
            console.log(error)
            next(ApiError.badRequest('Ошибка при получении брендов'))
        }
    }
}
