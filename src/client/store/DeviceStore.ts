import { makeAutoObservable }  from 'mobx'
import type { IBrand, IDevice, IType } from '../types'

export class DeviceStore {
    // массив всех категорий
    _types: IType[] = [
        { id: 1, name: "Смартфон" },
        { id: 2, name: "Ноутбук" },
        { id: 3, name: "Планшет" },
        { id: 4, name: "Телевизор" },
    ]
    _brands: IBrand[] = [
        { id: 1, name: "Samsung" },
        { id: 2, name: "Apple" },
        { id: 3, name: "Lenovo" },
        { id: 4, name: "Huawei" },
    ]
    _devices: IDevice[] = [
        {
            id: 1,
            name: "iPhone 15 Pro",
            price: 100000,
            rating: 5,
            img: "/test_img_2.jpg",
            typeId: 1,
            brandId: 2,
            info: [
                { id: 1, title: "Память", description: "256 ГБ" },
                { id: 2, title: "Камера", description: "48 Мп" }
            ]
        },
        {
            id: 2,
            name: "Samsung Galaxy S24",
            price: 90000,
            rating: 4,
            img: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400",
            typeId: 1,
            brandId: 1,
            info: [
                { id: 3, title: "Память", description: "128 ГБ" },
                { id: 4, title: "Процессор", description: "Exynos 2400" }
            ]
        },
        {
            id: 3,
            name: "Lenovo IdeaPad 3",
            price: 50000,
            rating: 3,
            img: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400",
            typeId: 2,
            brandId: 3,
            info: [
                { id: 5, title: "Экран", description: "15.6 дюймов" },
                { id: 6, title: "ОЗУ", description: "8 ГБ" }
            ]
        },
        {
            id: 4,
            name: "Apple MacBook Pro",
            price: 120000,
            rating: 5,
            img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
            typeId: 2,
            brandId: 2,
            info: [
                { id: 7, title: "Процессор", description: "Apple M3" },
                { id: 8, title: "Экран", description: "16 дюймов" },
            ]
        },
        {
            id: 5,
            name: "Samsung Galaxy S24",
            price: 90000,
            rating: 4,
            img: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400",
            typeId: 1,
            brandId: 1,
            info: [
                { id: 3, title: "Память", description: "128 ГБ" },
                { id: 4, title: "Процессор", description: "Exynos 2400" }
            ]
        },
        {
            id: 6,
            name: "Lenovo IdeaPad 3",
            price: 50000,
            rating: 3,
            img: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400",
            typeId: 2,
            brandId: 3,
            info: [
                { id: 5, title: "Экран", description: "15.6 дюймов" },
                { id: 6, title: "ОЗУ", description: "8 ГБ" }
            ]
        },
        {
            id: 7,
            name: "Apple MacBook Pro",
            price: 120000,
            rating: 5,
            img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
            typeId: 2,
            brandId: 2,
            info: [
                { id: 7, title: "Процессор", description: "Apple M3" },
                { id: 8, title: "Экран", description: "16 дюймов" },
            ]
        },
        {
            id: 8,
            name: "Samsung Galaxy S24",
            price: 90000,
            rating: 4,
            img: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400",
            typeId: 1,
            brandId: 1,
            info: [
                { id: 3, title: "Память", description: "128 ГБ" },
                { id: 4, title: "Процессор", description: "Exynos 2400" }
            ]
        },
        {
            id: 9,
            name: "Lenovo IdeaPad 3",
            price: 50000,
            rating: 3,
            img: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400",
            typeId: 2,
            brandId: 3,
            info: [
                { id: 5, title: "Экран", description: "15.6 дюймов" },
                { id: 6, title: "ОЗУ", description: "8 ГБ" }
            ]
        },
        {
            id: 10,
            name: "Apple MacBook Pro",
            price: 120000,
            rating: 5,
            img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
            typeId: 2,
            brandId: 2,
            info: [
                { id: 7, title: "Процессор", description: "Apple M3" },
                { id: 8, title: "Экран", description: "16 дюймов" },
            ]
        }
    ]

    // объект выбранной прямо сейчас категории
    _selectedType: IType | null = null
    _selectedBrand: IBrand | null = null   
    _totalCount: number = 0
    _limit: number = 3
    _page: number = 1   
    
    constructor() {
    makeAutoObservable(this)
    }

    setTypes (types: IType[]) {
        this._types = types;
    }
    get types() {
        return this._types;
    }
    setBrands (brands: IBrand[]) {
        this._brands = brands;
    }
    get brands() {
        return this._brands;
    }
    setDevices (devices: IDevice[]) {
        this._devices = devices;
    }
    get devices() {
        return this._devices;
    }
    setSelectedType (type: IType) {
        this._selectedType = type;
    }
    get selectedType() {
        return this._selectedType;
    }
    setSelectedBrand (brand: IBrand) {
        this._selectedBrand = brand;
    }
    get selectedBrand() {
        return this._selectedBrand;
    }
    setPage (page: number) {
        this._page = page;
    }
    get page() {
        return this._page;
    }
    setTotalCount (count: number) {
        this._totalCount = count;
    }
    get totalCount() {
        return this._totalCount;
    }
    setLimit (limit: number) {
        this._limit = limit;
    }
    get limit() {
        return this._limit;
    }
}