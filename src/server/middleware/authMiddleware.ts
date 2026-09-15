import type { NextFunction,  Request,  Response } from "express";
import { ApiError } from "../error/ApiError";
import  jwt  from "jsonwebtoken";
import type { IUser } from "../../client/types";
import { config } from "../../../config";


// защита от неавторизированного пользователя, КПП(передал ли он валидный JWT-токен)
export default function (req: Request, res: Response, next: NextFunction) {
    // предварит.запрос перед реальным
    if (req.method === 'OPTIONS') {
        return  next()
    }    

    // Достаем заголовок Authorization (он имеет вид: "Bearer eyJhbGciOi...")
        const authHeader = req.headers.authorization
        const token = authHeader && authHeader.split(' ')[1] // Берем вторую часть (сам токен)
    try {
        if (!token) {
            return next(ApiError.unAuthorized('Пользователь не авторизован'))
        }
  // Расшифровываем токен с помощью секретного ключа
        const decoded = jwt.verify(token, config.SECRET_KEY);
 // Благодаря этому контроллер, вызванный следующим, сможет прочитать req.user!  
 // Данные пользователя, которые заложил сюда authMiddleware!
 // юзер уже авторизован, приклеивает его токен т.е все данные пользователя к
        req.user = decoded as IUser
        next()
    } catch (e) {
        console.log(e)
        return next(ApiError.unAuthorized('Пользователь не авторизован'))
        
    }

} 
