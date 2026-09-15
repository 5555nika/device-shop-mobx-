import type { IBrand, IDevice, IType } from "../types"

export const INITIAL_TYPES: IType[] = [
    { id: 1, name: "Смартфон" },
    { id: 2, name: "Ноутбук" },
    { id: 3, name: "Планшет" },
    { id: 4, name: "Наушники" },
    { id: 5, name: "Смарт-часы" },
]

export const INITIAL_BRANDS: IBrand[] = [
    { id: 1, name: "Samsung" },
    { id: 2, name: "Apple" },
    { id: 3, name: "Xiaomi" },
    { id: 4, name: "Sony" },
    { id: 5, name: "Huawei" },
    { id: 6, name: "Lenovo" },
]

export const INITIAL_DEVICES: IDevice[] = [
    {
        id: 1,
        name: "iPhone 15 Pro Max",
        price: 135000,
        rating: 5,
        img: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&auto=format&fit=crop&q=80",
        typeId: 1,
        brandId: 2,
        info: [
            { id: 1, title: "Память", description: "256 ГБ" },
            { id: 2, title: "Процессор", description: "Apple A17 Pro" },
            { id: 3, title: "Камера", description: "48 Мп + 12 Мп + 12 Мп" },
            { id: 4, title: "Экран", description: "6.7\" Super Retina XDR OLED 120 Гц" }
        ]
    },
    {
        id: 2,
        name: "Samsung Galaxy S24 Ultra",
        price: 125000,
        rating: 5,
        img: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&auto=format&fit=crop&q=80",
        typeId: 1,
        brandId: 1,
        info: [
            { id: 5, title: "Память", description: "512 ГБ" },
            { id: 6, title: "Процессор", description: "Snapdragon 8 Gen 3" },
            { id: 7, title: "Камера", description: "200 Мп + 50 Мп + 12 Мп + 10 Мп" },
            { id: 8, title: "Стилус", description: "Встроенный S-Pen" }
        ]
    },
    {
        id: 3,
        name: "Apple MacBook Pro 16",
        price: 240000,
        rating: 5,
        img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=80",
        typeId: 2,
        brandId: 2,
        info: [
            { id: 9, title: "Процессор", description: "Apple M3 Max" },
            { id: 10, title: "ОЗУ", description: "36 ГБ Unified Memory" },
            { id: 11, title: "SSD", description: "1 ТБ NVMe" },
            { id: 12, title: "Экран", description: "16.2\" Liquid Retina XDR" }
        ]
    },
    {
        id: 4,
        name: "Xiaomi 14 Ultra",
        price: 89000,
        rating: 4,
        img: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&auto=format&fit=crop&q=80",
        typeId: 1,
        brandId: 3,
        info: [
            { id: 13, title: "Камера", description: "Оптика Leica Quad Camera 50 Мп" },
            { id: 14, title: "Зарядка", description: "90 Вт проводная / 80 Вт беспроводная" }
        ]
    },
    {
        id: 5,
        name: "Sony WH-1000XM5",
        price: 37000,
        rating: 5,
        img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80",
        typeId: 4,
        brandId: 4,
        info: [
            { id: 15, title: "Шумоподавление", description: "Активное ANC с двумя процессорами" },
            { id: 16, title: "Автономность", description: "До 30 часов" }
        ]
    },
    {
        id: 6,
        name: "Apple AirPods Pro 2",
        price: 24000,
        rating: 5,
        img: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=600&auto=format&fit=crop&q=80",
        typeId: 4,
        brandId: 2,
        info: [
            { id: 17, title: "Чип", description: "Apple H2" },
            { id: 18, title: "Разъем кейса", description: "USB Type-C + MagSafe" }
        ]
    },
    {
        id: 7,
        name: "Apple iPad Air 11 M2",
        price: 68000,
        rating: 5,
        img: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&auto=format&fit=crop&q=80",
        typeId: 3,
        brandId: 2,
        info: [
            { id: 19, title: "Процессор", description: "Apple M2" },
            { id: 20, title: "Экран", description: "11\" Liquid Retina" }
        ]
    },
    {
        id: 8,
        name: "Lenovo Legion Pro 5",
        price: 145000,
        rating: 4,
        img: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&auto=format&fit=crop&q=80",
        typeId: 2,
        brandId: 6,
        info: [
            { id: 21, title: "Видеокарта", description: "NVIDIA GeForce RTX 4070" },
            { id: 22, title: "Процессор", description: "Intel Core i7-14700HX" }
        ]
    },
    {
        id: 9,
        name: "Huawei Watch GT 4",
        price: 19000,
        rating: 4,
        img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80",
        typeId: 5,
        brandId: 5,
        info: [
            { id: 23, title: "Корпус", description: "Нержавеющая сталь" },
            { id: 24, title: "Автономность", description: "До 14 дней" }
        ]
    }
]

// ============ LOCAL STORAGE HELPERS ============

const STORAGE_KEYS = {
    TYPES: 'mobix_types',
    BRANDS: 'mobix_brands',
    DEVICES: 'mobix_devices',
    BASKET: 'mobix_basket',
    USER: 'mobix_user'
}

export const getLocalTypes = (): IType[] => {
    const saved = localStorage.getItem(STORAGE_KEYS.TYPES)
    if (saved) {
        try { return JSON.parse(saved) } catch {}
    }
    localStorage.setItem(STORAGE_KEYS.TYPES, JSON.stringify(INITIAL_TYPES))
    return INITIAL_TYPES
}

export const saveLocalType = (type: IType): IType => {
    const types = getLocalTypes()
    const newType = { ...type, id: type.id || Date.now() }
    types.push(newType)
    localStorage.setItem(STORAGE_KEYS.TYPES, JSON.stringify(types))
    return newType
}

export const getLocalBrands = (): IBrand[] => {
    const saved = localStorage.getItem(STORAGE_KEYS.BRANDS)
    if (saved) {
        try { return JSON.parse(saved) } catch {}
    }
    localStorage.setItem(STORAGE_KEYS.BRANDS, JSON.stringify(INITIAL_BRANDS))
    return INITIAL_BRANDS
}

export const saveLocalBrand = (brand: IBrand): IBrand => {
    const brands = getLocalBrands()
    const newBrand = { ...brand, id: brand.id || Date.now() }
    brands.push(newBrand)
    localStorage.setItem(STORAGE_KEYS.BRANDS, JSON.stringify(brands))
    return newBrand
}

export const getLocalDevices = (): IDevice[] => {
    const saved = localStorage.getItem(STORAGE_KEYS.DEVICES)
    if (saved) {
        try { return JSON.parse(saved) } catch {}
    }
    localStorage.setItem(STORAGE_KEYS.DEVICES, JSON.stringify(INITIAL_DEVICES))
    return INITIAL_DEVICES
}

export const saveLocalDevice = (deviceData: { name: string; price: number; typeId: number; brandId: number; img?: string; info?: Array<{ title: string; description: string }> }): IDevice => {
    const devices = getLocalDevices()
    const newDevice: IDevice = {
        id: Date.now(),
        name: deviceData.name,
        price: Number(deviceData.price),
        rating: 5,
        img: deviceData.img || "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600",
        typeId: Number(deviceData.typeId),
        brandId: Number(deviceData.brandId),
        info: (deviceData.info || []).map((item, idx) => ({ id: idx + 1, ...item }))
    }
    devices.unshift(newDevice)
    localStorage.setItem(STORAGE_KEYS.DEVICES, JSON.stringify(devices))
    return newDevice
}

// Basket helpers
export interface ILocalBasketItem {
    id: number
    deviceId: number
    device: IDevice
}

export const getLocalBasket = (): ILocalBasketItem[] => {
    const saved = localStorage.getItem(STORAGE_KEYS.BASKET)
    if (saved) {
        try { return JSON.parse(saved) } catch {}
    }
    return []
}

export const addLocalBasket = (deviceId: number): ILocalBasketItem[] => {
    const basket = getLocalBasket()
    const devices = getLocalDevices()
    const foundDevice = devices.find(d => d.id === deviceId)
    if (foundDevice) {
        const newItem: ILocalBasketItem = {
            id: Date.now(),
            deviceId,
            device: foundDevice
        }
        basket.push(newItem)
        localStorage.setItem(STORAGE_KEYS.BASKET, JSON.stringify(basket))
    }
    return basket
}

export const removeLocalBasket = (deviceId: number): ILocalBasketItem[] => {
    const basket = getLocalBasket()
    const index = basket.findIndex(item => item.deviceId === deviceId)
    if (index !== -1) {
        basket.splice(index, 1)
        localStorage.setItem(STORAGE_KEYS.BASKET, JSON.stringify(basket))
    }
    return basket
}

export const clearLocalBasket = (): ILocalBasketItem[] => {
    localStorage.removeItem(STORAGE_KEYS.BASKET)
    return []
}
