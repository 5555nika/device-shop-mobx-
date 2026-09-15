import type { NextFunction, Request, Response } from "express";
import { ApiError } from "../error/ApiError";
import { BasketDevice, Device , Basket} from "../models/models";

export class BasketController {
     // Получить корзину пользователя
    static async getBasket (req: Request, res: Response, next: NextFunction) {
        try {
            // Получаем ID пользователя
            const userId = req.user.id 
            // Находим или создаём корзину пользователя
            let basket = await Basket.findOne({ where: { userId } })
            if (!basket) {
                basket = await Basket.create({ userId })
            }

            // Если корзина есть, идем дальше получаем все товары в корзине с информацией о товарах
            const basketDevices = await BasketDevice.findAll({
                where: { basketId: basket.id },
                // Включаем в запрос информацию о товаре
                include: [{ model: Device }]
            })   
            return res.json(basketDevices)
        } catch (e) {
            console.log(e)
            return next(ApiError.badRequest("Ошибка при получении корзины"))
        }
    }

    // Добавить товар в корзину
    static async addBasket (req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.user.id
            const { deviceId } = req.body
            // Проверяем, что ID конкретного товара указан
            if (!deviceId) {
                return next(ApiError.badRequest("Не указан ID устройства"))
            }
             // Проверяем существует ли товар
            const device = await Device.findOne({ where: { id: deviceId }})
            if (!device) {
                return next(ApiError.badRequest("Устройство не найдено"))
            }
    
            let basket = await Basket.findOne({ where: { userId } })
            if (!basket) {
                basket = await Basket.create({ userId })
            }
            // ID корзины - уник. номер корзины
             // Проверяем, есть ли уже этот товар в корзине,защита от дублей  
            const existingItem = await BasketDevice.findOne({ where: { basketId: basket.id, deviceId } })  
            if (existingItem) {
                return next(ApiError.badRequest("Товар уже в корзине"))
            }
            const basketDevice = await BasketDevice.create({ basketId: basket.id, deviceId})
            return res.json(basketDevice)
        } catch (e) {
            return next(ApiError.badRequest((e as Error).message)) 
        }
    }


    static async removeDevice (req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.user.id
            const { deviceId } = req.params
            // Находим корзину пользователя
            const basket = await Basket.findOne({ where: { userId } })
            if (!basket) {
                return next(ApiError.badRequest("Корзина не найдена"))
            }
            
            // убеждаемся что товар из корзины этого пользователя и какой именно товар удаляем
            const basketDevice = await BasketDevice.findOne({ where: { basketId: basket.id, deviceId } })
            if (!basketDevice) {
                return next(ApiError.badRequest("Товар не найден в корзине"))
            }
            
            await basketDevice.destroy()
            return res.json('Товар удален из корзины')
        } catch (e) {
            next(ApiError.badRequest((e as Error).message))          
        }
    }
    
    static async clearBasket (req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.user.id
            const basket = await Basket.findOne({ where: { userId } })
            if (!basket) {
                return next(ApiError.badRequest("Корзина не найдена"))
            }
            
            await BasketDevice.destroy({
                // удал. все товары из корзины,но не удаляем сам товар,просто выкладываем товар обратно из тележки на полку
                where: { basketId: basket.id}
            })
            return res.json('Корзина очищена')
            
        } catch (e) {
            next(ApiError.badRequest((e as Error).message)) 
        }
    }
    
} 
