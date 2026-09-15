import { $authHost, $host } from "./index"
import type { IBrand, IDevice, IType } from "../types"
import {
    getLocalTypes,
    saveLocalType,
    getLocalBrands,
    saveLocalBrand,
    getLocalDevices,
    saveLocalDevice,
    getLocalBasket,
    addLocalBasket,
    removeLocalBasket,
    clearLocalBasket
} from "./mockData"

// ============ TYPES API ============

export const fetchTypes = async (): Promise<IType[]> => {
    try {
        const { data } = await $host.get<IType[]>('/api/type')
        return data
    } catch (e) {
        console.warn('Сервер недоступен, загружаем локальные типы:', e)
        return getLocalTypes()
    }
}

export const createType = async (type: IType) => {
    try {
        const { data } = await $authHost.post('/api/type', type)
        return data
    } catch (e) {
        console.warn('Сервер недоступен, сохраняем тип локально:', e)
        return saveLocalType(type)
    }
}

// ============ BRANDS API ============

export const fetchBrands = async (): Promise<IBrand[]> => {
    try {
        const { data } = await $host.get<IBrand[]>('/api/brand')
        return data
    } catch (e) {
        console.warn('Сервер недоступен, загружаем локальные бренды:', e)
        return getLocalBrands()
    }
}

export const createBrand = async (brand: IBrand) => {
    try {
        const { data } = await $authHost.post('/api/brand', brand)
        return data
    } catch (e) {
        console.warn('Сервер недоступен, сохраняем бренд локально:', e)
        return saveLocalBrand(brand)
    }
}

// ============ DEVICES API ============

export const fetchDevices = async (
    typeId?: number,
    brandId?: number,
    page = 1,
    limit = 9
): Promise<{ count: number; rows: IDevice[] }> => {
    try {
        const { data } = await $host.get<{ count: number; rows: IDevice[] }>('/api/device', {
            params: { typeId, brandId, page, limit }
        })
        return data
    } catch (e) {
        console.warn('Сервер недоступен, фильтруем устройства из локального каталога:', e)
        let all = getLocalDevices()

        if (typeId) {
            all = all.filter(d => d.typeId === Number(typeId))
        }
        if (brandId) {
            all = all.filter(d => d.brandId === Number(brandId))
        }

        const count = all.length
        const start = (page - 1) * limit
        const rows = all.slice(start, start + limit)

        return { count, rows }
    }
}

export const createDevice = async (device: FormData) => {
    try {
        const { data } = await $authHost.post('/api/device', device)
        return data
    } catch (e) {
        console.warn('Сервер недоступен, сохраняем устройство в локальном каталоге:', e)
        const name = device.get('name') as string || 'Новый товар'
        const price = Number(device.get('price')) || 0
        const typeId = Number(device.get('typeId')) || 1
        const brandId = Number(device.get('brandId')) || 1
        
        let info = []
        const rawInfo = device.get('info')
        if (rawInfo && typeof rawInfo === 'string') {
            try { info = JSON.parse(rawInfo) } catch {}
        }

        return saveLocalDevice({
            name,
            price,
            typeId,
            brandId,
            img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600",
            info
        })
    }
}

export const fetchOneDevice = async (id: string): Promise<IDevice> => {
    try {
        const { data } = await $host.get<IDevice>('/api/device/' + id)
        return data
    } catch (e) {
        console.warn(`Сервер недоступен, ищем устройство ${id} в локальном каталоге:`, e)
        const all = getLocalDevices()
        const found = all.find(d => String(d.id) === String(id))
        if (found) return found
        return all[0] || {
            id: Number(id),
            name: "Устройство",
            price: 0,
            rating: 5,
            img: "",
            typeId: 1,
            brandId: 1,
            info: []
        }
    }
}

// ============ BASKET API ============

export const fetchBasket = async () => {
    try {
        const { data } = await $authHost.get('/api/basket')
        return data
    } catch (e) {
        console.warn('Сервер недоступен, загружаем корзину из localStorage:', e)
        return getLocalBasket()
    }
}

export const addToBasket = async (deviceId: number) => {
    try {
        const { data } = await $authHost.post('/api/basket', { deviceId })
        return data
    } catch (e) {
        console.warn('Сервер недоступен, добавляем в корзину локально:', e)
        return addLocalBasket(deviceId)
    }
}

export const removeFromBasket = async (deviceId: number) => {
    try {
        const { data } = await $authHost.delete('/api/basket/' + deviceId)
        return data
    } catch (e) {
        console.warn('Сервер недоступен, удаляем из корзины локально:', e)
        return removeLocalBasket(deviceId)
    }
}

export const clearBasket = async () => {
    try {
        const { data } = await $authHost.delete('/api/basket')
        return data
    } catch (e) {
        console.warn('Сервер недоступен, очищаем корзину локально:', e)
        return clearLocalBasket()
    }
}
