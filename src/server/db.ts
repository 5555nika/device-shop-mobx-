import { Sequelize } from 'sequelize'
import { config } from '../../config'

// Sequelize подключается к базе данных,
//  а таблицы — это то, что создаётся внутри неё на основе моделей 
export const sequelize = new Sequelize(
    config.DB_NAME,
    config.DB_USER,
    config.DB_PASSWORD,
    {
        dialect: 'postgres',
        host: config.DB_HOST,
        port: config.DB_PORT
    }

)
