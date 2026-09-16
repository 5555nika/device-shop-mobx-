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

export const fetchDevices = async (typeId?: number, brandId?: number, page?: number, limit = 9)
            : Promise<{ count: number; rows: IDevice[] }> => {
    const { data } = await $host.get<{ count: number; rows: IDevice[] }>('/api/device', {
        params: { typeId, brandId, page, limit }
    })
    return data
}

export const createDevice = async (device: FormData) => {
    const { data } = await $authHost.post('/api/device', device)
    return data
}

export const fetchOneDevice = async (id: string): Promise<IDevice> => {
    const { data } = await $host.get<IDevice>('/api/device/' + id)
    return data
}

// ============ BASKET API ============

export const fetchBasket = async () => {
    const { data } = await $authHost.get('/api/basket')
    return data
}

export const addToBasket = async (deviceId: number) => {
    const { data } = await $authHost.post('/api/basket', { deviceId })
    return data
}

export const removeFromBasket = async (deviceId: number) => {
    const { data } = await $authHost.delete('/api/basket/' + deviceId)
    return data
}

export const clearBasket = async () => {
    const { data } = await $authHost.delete('/api/basket')
    return data
}
