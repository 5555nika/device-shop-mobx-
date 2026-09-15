import type { NextFunction, Request, Response } from "express";
import { ApiError } from "../error/ApiError"
import { User, Basket } from "../models/models";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import type { IUser } from "../../client/types/index"
import { config } from "../../../config";

// подписывает — гарантирует, что данные не были изменены
const generatorJWT = ({ id, email, role }: IUser) => {
    const payload = { id, email, role };
    return jwt.sign(payload,
        config.SECRET_KEY, // для проверки подписи, а не для шифрования.
        {expiresIn: '24h'}
    )
}
// созд. нов. пользователя в БД
export class UserController {
    // создание нового пользователя в БД и генерация токена
    static async registration(req: Request, res: Response, next: NextFunction) {
        // извлекаем из запроса данные
        const { email, password, role } = req.body
        // проверяем, что email и password не пустые
        if (!email || !password) {
            return next(ApiError.badRequest('Некорректный email или password'));
        }
        // проверяем есть ли уже такой пользователь
        const candidate = await User.findOne({ where: { email } })
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'));
        }
        // шифруем пароль
        const hashPassword = await bcrypt.hash(password, 5)
        // создаем пользователя
        const user = await User.create({ email, role, password: hashPassword });
        // создаем корзину
        await Basket.create({ userId: user.id})
        // генерируем токен
        const token = generatorJWT({ id: user.id, email: user.email, role: user.role})
        // отправляем токен
        return res.json({ token })
    }
    // вход пользователя в систему, проверка email и password, если все ок, то генерируем токен
    static async login(req: Request, res: Response, next: NextFunction) {
        const { email, password } = req.body
        // ищем пользователя по email
        const userFromDb = await User.findOne({ where: { email } });
        if (!userFromDb) {
            return next(ApiError.badRequest('Пользователь не найден'));
        }
        // если у пользователя не установлен пароль
        if (!userFromDb.password) {
            return next(ApiError.badRequest('У пользователя не установлен пароль'));
        }
        // сравниваем пароль
        const comparePassword = bcrypt.compareSync(password, userFromDb.password) 
        if (!comparePassword) {
            return next(ApiError.badRequest('Указан неверный пароль'))
        }
        // если все ок, генерируем токен и отправляем
        const token = generatorJWT({ id: userFromDb.id, email: userFromDb.email, role: userFromDb.role })
        return res.json({ token })

    }

// проверка актуальности, продление сессии, раб.после как мидлеваре успешнно законч. проверку и наполнил данными, подтверждение авторизован, то возвращаем токен на основе уже проверенных данных, генерирует новый (перевыпущенный) JWT-токен 
    static async check(req: Request, res: Response) {
// Данные пользователя, которые заложил сюда authMiddleware!
        const user = req.user;
        const token = generatorJWT({ id: user.id, email: user.email, role: user.role }) // Генерируем НОВЫЙ токен
        return res.json({ token })  // Отправляем свежий токен клиенту

    }
}



