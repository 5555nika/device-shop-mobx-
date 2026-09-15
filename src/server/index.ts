import 'dotenv/config' // эта функция загружает переменные из файла .env в process.env.

import express from 'express'
import  cors  from 'cors'
import router  from './routers/index'
import { fileURLToPath } from 'url'
import path from 'path'
import { sequelize } from './db'
import fileUpload from 'express-fileupload'
import errorMiddleware from './middleware/errorMiddleware'
import { config } from '../../config'

const __filePath = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filePath)

const PORT = config.PORT

const app = express()

app.use(cors()) // Разрешает фронтенду делать запросы к бэкенду
app.use(express.json())  // req.body
//  для сохраняем  раздачи статических файлов (изображений, документов и т.д.) из указанной папки, делает их доступными по URL.
app.use(express.static(path.resolve(__dirname, '..', '..', 'public')))
// Позволяет серверу принимать загруженные картинки товаров и кладёт их в req.files.
app.use(fileUpload({})) // JSON не может передавать бинарные данные (файлы, фото), для этого нужен multipart/form-data.
app.use('/api', router)

app.use(errorMiddleware)

app.get('/', (_, res) => {
    res.send('Server is running')
})

async  function  start () {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`server started on port ${PORT}`))
    } catch (error) {
        console.log(error)
    }
}
start()
