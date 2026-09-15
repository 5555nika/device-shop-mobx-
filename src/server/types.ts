

export interface IUser {
    id?: number,
    email?: string,
    role?: string,
    password?: string
}

export interface IJwtPayload extends IUser {
  exp: number; // Время истечения срока (число)
}

export interface IUserAuth {
    id?: number,
    email: string,
    role: string,
    password: string
}
export interface IType {
    id: number;
    name: string;
}

export interface IBrand {
    id: number;
    name: string;
}

export interface IDeviceInfo {
    id: number;
    title: string;
    description: string;
    deviceId?: number
}

export interface IDevice {
    id: number;
    name: string;
    price: number;
    rating: number;
    img: string;
    typeId?: number;
    brandId?: number;
    info?: IDeviceInfo[];
}

export interface IRating {
    id: number;
    rate: number;
}

export interface ITypeBrand {
    id: number;
}

export interface IBasket {
    id: number;
    userId?: number;
}

export interface IBasketDevice {
    id: number;
    userId?: number;
    deviceId?: number;
    basketId?: number
    device?: IDevice;   
}


// Типы для store

export interface IDeviceStore {
    id: number
    name: string
    price: number
    rating: number
    img: string
    typeId?: number
    brandId?: number
}
