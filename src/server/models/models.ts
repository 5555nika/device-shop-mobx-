import { sequelize } from "../db";
import { DataTypes, Model } from 'sequelize' 
import type { IUser, IBasket, IBasketDevice, IDevice, IType, IBrand, IRating, IDeviceInfo, ITypeBrand } from "../../client/types" 

// Интерфейсы инстансов моделей для чистого типизирования sequelize.define
export interface UserInstance extends Model<IUser, Partial<IUser>>, IUser {}
export const User = sequelize.define<UserInstance>('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true  },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: 'USER' }
});

// Корзина(контайнер)
export interface BasketInstance extends Model<IBasket, Partial<IBasket>>, IBasket {}
export const Basket = sequelize.define<BasketInstance>('basket', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
});

// Товар  в  корзине(мост между корз. и товаром, котор.хранит детали именно конкрет.покупки в данн. момент(список таких позиций, которые ссылается на конкр.тов: кол-во: 3шт, опции: цвет)
export interface BasketDeviceInstance extends Model<IBasketDevice, Partial<IBasketDevice>>, IBasketDevice {}
export const BasketDevice = sequelize.define<BasketDeviceInstance>('basket_device', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
});

// Товар из каталога(Смартфон )
export interface DeviceInstance extends Model<IDevice, Partial<IDevice>>, IDevice {}
export const Device = sequelize.define<DeviceInstance>('device', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false},
    price: { type: DataTypes.INTEGER, allowNull: false},
    rating: { type: DataTypes.INTEGER, defaultValue: 0 },
    img: {  type: DataTypes.STRING, allowNull: false}
});

export interface TypeInstance extends Model<IType, Partial<IType>>, IType {}
export const Type = sequelize.define<TypeInstance>('type', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false}
});

export interface BrandInstance extends Model<IBrand, Partial<IBrand>>, IBrand {}
export const Brand = sequelize.define<BrandInstance>('brand', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false}
});

export interface RatingInstance extends Model<IRating, Partial<IRating>>, IRating {}
export const Rating = sequelize.define<RatingInstance>('rating', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    rate: { type: DataTypes.INTEGER, allowNull: false}
});

export interface DeviceInfoInstance extends Model<IDeviceInfo, Partial<IDeviceInfo>>, IDeviceInfo {}
export const DeviceInfo = sequelize.define<DeviceInfoInstance>('device_info', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false},
    description: { type: DataTypes.STRING, allowNull: false},
});

export interface TypeBrandInstance extends Model<ITypeBrand, Partial<ITypeBrand>>, ITypeBrand {}
export const TypeBrand = sequelize.define<TypeBrandInstance>('type_brand', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
});


// Связи (Associations)

User.hasOne(Basket)
Basket.belongsTo(User)

// польз. мож. оставл. много оценок
User.hasMany(Rating)
// кажд. оценка принадлеж.одному польз.
Rating.belongsTo(User)

// в одной корз. может наход. много записей(позиций) о тов.
Basket.hasMany(BasketDevice)
BasketDevice.belongsTo(Basket)

// мож. быть много устройств
Type.hasMany(Device)
// кажд. устр-во относ. к конкрет. типу
Device.belongsTo(Type)

Brand.hasMany(Device)
Device.belongsTo(Brand)

// одно уст-во может входить в множество записей корзин(разн. польз. т.е товар мож. наход. в корзинах у сотен покупателей)
Device.hasMany(BasketDevice)
// все  записи будут ссыл.на один и тот же базов.товар
BasketDevice.belongsTo(Device)

Device.hasMany(Rating)
Rating.belongsTo(Device)

// устр-во имеет доп. хар-ку
Device.hasMany(DeviceInfo, { as: 'info' } )
DeviceInfo.belongsTo(Device)

// один тип/бренд может содерж. много брендов,а один бренд выпуск. много типов
Type.belongsToMany(Brand, { through: TypeBrand })
Brand.belongsToMany(Type, { through: TypeBrand })
