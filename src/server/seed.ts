import { sequelize } from "./db"
import { Type, Brand, Device, DeviceInfo } from "./models/models"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __filePath = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filePath)

async function seed() {
    try {
        console.log("Connecting to database...")
        await sequelize.authenticate()
        
        console.log("Syncing database (dropping existing tables)...")
        await sequelize.sync({ force: true })

        console.log("Creating Types...")
        const typePhone = await Type.create({ name: "Смартфон" })
        const typeLaptop = await Type.create({ name: "Ноутбук" })
        const typeTablet = await Type.create({ name: "Планшет" })
        const typeTV = await Type.create({ name: "Телевизор" })

        console.log("Creating Brands...")
        const brandSamsung = await Brand.create({ name: "Samsung" })
        const brandApple = await Brand.create({ name: "Apple" })
        const brandLenovo = await Brand.create({ name: "Lenovo" })
        const brandHuawei = await Brand.create({ name: "Huawei" })

        console.log("Creating Devices...")
        const dev1 = await Device.create({
            name: "iPhone 15 Pro",
            price: 100000,
            rating: 5,
            img: "test_img.jpg",
            typeId: typePhone.id,
            brandId: brandApple.id
        })

        const dev2 = await Device.create({
            name: "Samsung Galaxy S24",
            price: 90000,
            rating: 4,
            img: "test_img_2.jpg",
            typeId: typePhone.id,
            brandId: brandSamsung.id
        })

        const dev3 = await Device.create({
            name: "Lenovo IdeaPad 3",
            price: 50000,
            rating: 3,
            img: "test_img_3.jpg",
            typeId: typeLaptop.id,
            brandId: brandLenovo.id
        })

        const dev4 = await Device.create({
            name: "Apple MacBook Pro",
            price: 120000,
            rating: 5,
            img: "test_img_4.jpg",
            typeId: typeLaptop.id,
            brandId: brandApple.id
        })

        console.log("Creating Device Infos...")
        await DeviceInfo.create({ deviceId: dev1.id, title: "Память", description: "256 ГБ" })
        await DeviceInfo.create({ deviceId: dev1.id, title: "Камера", description: "48 Мп" })
        
        await DeviceInfo.create({ deviceId: dev2.id, title: "Память", description: "128 ГБ" })
        await DeviceInfo.create({ deviceId: dev2.id, title: "Процессор", description: "Exynos 2400" })

        await DeviceInfo.create({ deviceId: dev3.id, title: "Экран", description: "15.6 дюймов" })
        await DeviceInfo.create({ deviceId: dev3.id, title: "ОЗУ", description: "8 ГБ" })

        await DeviceInfo.create({ deviceId: dev4.id, title: "Процессор", description: "Apple M3" })
        await DeviceInfo.create({ deviceId: dev4.id, title: "Экран", description: "14 дюймов" })

        // Создаем фиктивные файлы картинок в папке public, чтобы не было 404
        const targetDir = path.resolve(__dirname, "..", "..", "public")
        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true })
        }

        const sourceImg = path.resolve(targetDir, "static", "camera-272263_1280.jpg")
        const images = ["test_img.jpg", "test_img_2.jpg", "test_img_3.jpg", "test_img_4.jpg"]
        
        if (fs.existsSync(sourceImg)) {
            for (const imgName of images) {
                fs.copyFileSync(sourceImg, path.resolve(targetDir, imgName))
                console.log(`Copied image to ${imgName}`)
            }
        } else {
            // Если исходной картинки нет, создаем пустые файлы
            for (const imgName of images) {
                fs.writeFileSync(path.resolve(targetDir, imgName), "")
                console.log(`Created empty placeholder image ${imgName}`)
            }
        }

        console.log("Database seeded successfully!")
        process.exit(0)
    } catch (e) {
        console.error("Error seeding database:", e)
        process.exit(1)
    }
}

seed()
