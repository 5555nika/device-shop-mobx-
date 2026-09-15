import { Sequelize } from 'sequelize'
import { config } from '../../config'

// Sequelize подключается к базе данных:
// Если указан DATABASE_URL (например, на Render), подключаемся через него с поддержкой SSL.
// Иначе подключаемся по локальным параметрам config (localhost).
export const sequelize = process.env.DATABASE_URL
    ? new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        },
        logging: false
    })
    : new Sequelize(
        config.DB_NAME,
        config.DB_USER,
        config.DB_PASSWORD,
        {
            dialect: 'postgres',
            host: config.DB_HOST,
            port: config.DB_PORT,
            logging: false
        }
    )
