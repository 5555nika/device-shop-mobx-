import { $authHost, $host } from "./index"
import type { IBrand, IDevice, IType } from "../types"

export const fetchTypes = async (): Promise<IType[]> => {
    const { data } = await $host.get<IType[]>('/api/type')
    return data
}

export const createType = async (type: IType) => {
    const { data } = await $authHost.post('/api/type', type)
    return data
}

export const fetchBrands = async (): Promise<IBrand[]> => {
    const { data } = await $host.get<IBrand[]>('/api/brand')
    return data
}

export const createBrand = async (brand: IBrand) => {
    const { data } = await $authHost.post('/api/brand', brand)
    return data
}
// (Получить список товаров с фильтрацией и пагинацией)
export const fetchDevices = async (typeId?: number, brandId?: number, page?: number, limit = 9)
            : Promise<{ count: number; rows: IDevice[] }> => {
    const { data } = await $host.get<{ count: number; rows: IDevice[] }>('/api/device', { // (query-параметрами)
        params: { typeId, brandId, page, limit }
    })
    return data
}

// params: Axios автомат. превращ. объект { typeId, brandId, page, limit } в стр. запроса вроде /api/device?typeId=1&page=2&limit=9. Это позволяет серверу отфильтровать товары по типу/бренду и вернуть только нужную страницу.
//  Объект с количеством подходящих товаров (count) и массивом товаров для текущей страницы (rows).


// FormData — это стандарт. способ отпр. данн. на сервер, когда среди этих данн. есть файлы (в нашем случае — картинка товара).
export const createDevice = async (device: FormData) => {
    const { data } = await $authHost.post('/api/device', device)
    return data
}

/*
в формате JSON невозможно напрямую передавать файлы (бинарные данные картинок). JSON умеет работать только с текстом, числами и логическими значениями.
FormData — это встроен. в браузер инстр. (объект JS), который имитирует отпр. обычной HTML-формы с типом кодирования multipart/form-data.
Этот формат спец. придуман для того, чтобы за один раз передавать на сервер и обычные текстовые поля, и файлы (картинки, документы, архивы).
Как это выглядит на практике (при создании товара)?
Когда админ. заполняет форму созд. товара, в коде созд. пустой объект FormData, а затем в него по очереди доб. («нанизываются») все поля с помощью метода .append():
const formData = new FormData()
// Добавляем обычный текст:
formData.append('name', 'iPhone 15 Pro')
formData.append('price', '100000')
formData.append('brandId', '2')
formData.append('typeId', '1')
// Добавляем файл картинки (полученный из тега <input type="file">):
formData.append('img', fileObject) // fileObject — это бинарный файл картинки

Axios автоматически понимает, что это FormData, и сам делает две важные вещи:

Устанавливает специальный HTTP-заголовок: Content-Type: multipart/form-data.
Правильно упаковывает картинку в бинарный поток, чтобы сервер смог её прочитать и сохранить на диск.

Что происходит на сервере?
На сервере бэкенд использует специальный модуль (например, express-fileupload или multer), который перехватывает этот multipart/form-data запрос:

Текстовые поля (name, price) он складывает в объект req.body.
Файл картинки (img) он складывает в объект req.files (или req.file), после чего сервер сохраняет картинку в папку со статическими файлами.
*/

export const fetchOneDevice = async (id: string): Promise<IDevice> => {
    const { data } = await $host.get<IDevice>('/api/device/' + id)
    return data
}


// ============ BASKET API ============

// Загружает список товаров, которые пользователь уже добавил в корзину.
export const fetchBasket = async () => {
    const { data } = await $authHost.get('/api/basket');
    return data;
};

export const addToBasket = async (deviceId: number) => {
    const { data } = await $authHost.post('/api/basket', { deviceId });
    return data;
};

export const removeFromBasket = async (deviceId: number) => {
    const { data } = await $authHost.delete('/api/basket/' + deviceId);
    return data;
};

export const clearBasket = async () => {
    const { data } = await $authHost.delete('/api/basket');
    return data;
};

