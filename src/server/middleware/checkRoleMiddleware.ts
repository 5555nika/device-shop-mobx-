import type { NextFunction, Response, Request } from "express";
import { ApiError } from "../error/ApiError";
import jwt from 'jsonwebtoken';
import { config } from "../../../config";
import type { IUser } from "../../client/types";

//  есть ли право доступа(авторизация) на основе роли пользователя
    export default function (role: string) {
        return function (req: Request, res: Response, next: NextFunction) {
            if (req.method === 'OPTIONS') {
                return next()
            }
            try {
                const authHeader = req.headers.authorization
                const token = authHeader && authHeader.split(' ')[1]
                if (!token) {
                    return next(ApiError.unAuthorized('Пользователь не авторизован'))
                }
                // расшифровка токена и получ.данные проверка подлинности и роли пользователя
                const decoded = jwt.verify(token, config.SECRET_KEY) as IUser
              // Сравниваем роль из токена с требуемой ролью
                if (decoded.role !== role) {
                    return next(ApiError.forBidden('Нет доступа'))
                }
                req.user = decoded 
                next()
            } catch (e) {
                console.log(e)
                return next(ApiError.unAuthorized('Пользователь не авторизован'))

            }
        }
    }
