import type { NextFunction, Request, Response } from "express";
import path from "path";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from 'uuid'
import { Device, DeviceInfo } from "../models/models";
import type { IDeviceInfo } from "../../client/types";
import { ApiError } from "../error/ApiError";
import type { UploadedFile } from "express-fileupload";


const __filename =  fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// принимает даннные и файл изображения и сохраняет его БД
export class DeviceController {
    static async create (req: Request, res: Response, next: NextFunction) {
        try {
            const { name, price, brandId, typeId } = req.body
            //дополнительная характеристика
            const info = req.body.info as string | undefined
            // проверка на наличие файла
            if (!req.files || !req.files.img) {
                return next(ApiError.badRequest('Файл не загружен'))
            }

            const img = req.files.img as UploadedFile
            // генерация уникального имени файла с расширением .jpg
            // Сохранение на диск: Мы генерируем файлу случайное уникальное имя (чтобы картинки разных пользователей с именем photo.jpg не перезаписали друг друга) и сохраняем файл на сервере в папку public:
            const filePath = uuidv4() + '.jpg'
            // сохранение файла в папку public, загруженная картинка сохраняется именно туда:
            img.mv(path.resolve(__dirname, '..', '..', '..', 'public', filePath))
            // создание устройства в базе данных
            const device = await Device.create({name, price, brandId, typeId, img: filePath })
        // создание дополнительных характеристик
            if (info) {
                const parsedInfo: IDeviceInfo[] = JSON.parse(info)
                const promises = parsedInfo.map((i: IDeviceInfo) => 
                    DeviceInfo.create({
                    // уникальный идентификатор устройства,чтобы понимать какому именно товару принадлежат эти св-ва
                        deviceId: device.id, 
                        title: i.title,
                        description: i.description,
                    }) 
                )
                await Promise.all(promises)
            }
            return res.json(device)
        } catch (e) {
            console.log(e)
            return next(ApiError.badRequest((e as Error).message))
        }
    }

    static async getAll(req: Request, res: Response) {
        const { brandId, typeId } = req.query 
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 9
        const offset = page * limit - limit
        
        const where: { typeId?: number; brandId?: number } = {}
        if (typeId) where.typeId = Number(typeId)
        if (brandId) where.brandId = Number(brandId)
        
        const devices = await Device.findAndCountAll({ where, limit, offset })

        return res.json(devices)
    }

    static async getOne(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params
        const device = await Device.findOne({
            where: { id: Number(id) },
            include: [{ model: DeviceInfo, as: 'info' }]
        })
        
        if (!device) {
            return next(ApiError.badRequest('Устройство не найдено'))
        }
        
        return res.json(device)
    }
}


//mData.append('img', file)
//пути: Запрос отправляется на сервер. express-fileupload перехватывает его, вытаскивает файл картинки из потока данных и аккуратно кладет его в специальный объект req.files.