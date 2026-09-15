import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Button, Card, Col, Image, Row, Spin, message } from "antd"
import type { IDevice } from "../types"
import { fetchOneDevice, addToBasket } from "../http/DeviceAPI"
import { useStore } from "../context"

export const DevicePage = () => {
    const { id } = useParams<{ id: string }>()
    const { device: deviceStore } = useStore()
    const [deviceItem, setDeviceItem] = useState<IDevice | null>(null)
    const [isloading, setIsloading] = useState(true)

    useEffect(() => {
        const loadDevice = async () => {
            if (!id) return
            try {
                setIsloading(true)
                const data = await fetchOneDevice(id!)
                setDeviceItem(data)
            } catch (err) {
                console.warn("Не удалось получить устройство с сервера, используем локальный стор:", err)
                const localDev = deviceStore.devices.find(d => d.id === Number(id))
                if (localDev) {
                    setDeviceItem(localDev as IDevice)
                } else {
                    setDeviceItem(null)
                }
            } finally {
                setIsloading(false)
            }
        }

        if (id) {
            loadDevice()
        }

    }, [id, deviceStore])
    

    const handleBasket = async () => {
        if (!deviceItem) return
    try {
        await addToBasket(deviceItem.id)
        message.success(`Товар "${deviceItem.name}" добавлен в корзину!`);
    } catch (e) {
        console.error('Ошибка при добавлении в корзину:', e);
        message.error('Не удалось добавить товар в корзину');
    }
}

    if (isloading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
                <Spin size="large" />
            </div>
        )
    }

    if (!deviceItem) {
        return (
            <div style={{ padding: '24px', textAlign: 'center' }}>
                <h2>Устройство не найдено</h2>
            </div>
        )
    }

    const getImgSrc = (img?: string) => {
        if (!img) return 'https://placehold.co/300x300?text=No+Image'
        if (img.startsWith('http://') || img.startsWith('https://')) return img
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000'
        const cleanImg = img.startsWith('/') ? img.slice(1) : img
        return `${apiUrl}/${cleanImg}`
    }

    return (
        <div style={{ padding: '24px'}}>
            <Row gutter={[24, 24]} align="middle">
                <Col xs={24} md={8}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f8f8f8', borderRadius: 8, padding: 16 }}>
                        <Image 
                            src={getImgSrc(deviceItem.img)}
                            alt={deviceItem.name}
                            style={{ maxHeight: 350, objectFit: 'contain' }}
                        />
                    </div>
                </Col>

                <Col xs={24} md={8}>
                    <div style={{ padding: '0 16px' }}>
                        <h2 style={{ fontSize: 28, marginBottom: 16 }}>{deviceItem.name}</h2>
                        <div style={{ fontSize: 18, color: '#ffb300', marginBottom: 16 }}>Рейтинг: {deviceItem.rating} ★</div>
                    </div>
                </Col>

                <Col xs={24} md={8}>
                    <Card hoverable style={{ textAlign: 'center' }}>
                        <h3 style={{ fontSize: 24, marginBottom: 16 }}>От {deviceItem.price} руб.</h3>
                        <Button type="primary" size="large" style={{ width: '100%' }}
                            onClick={handleBasket}>
                            Добавить в корзину
                        </Button>
                    </Card>
                </Col>
            </Row>

            {deviceItem.info && deviceItem.info.length > 0 && (
                <div style={{ marginTop: 40 }}>
                    <h3 style={{ fontSize: 22, borderBottom: '1px solid #f0f0f0', paddingBottom: 8 }}>Характеристики</h3>
                    {deviceItem.info.map((i, index) => (
                        <Row 
                            key={i.id}
                            style={{ 
                                background: index % 2 ? '#f9f9f9' : 'transparent', 
                                padding: '12px 16px',
                                fontSize: 16,
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}
                        >
                            <span style={{ color: '#555' }}>{i.title}</span>
                            <span style={{ fontWeight: 500 }}>{i.description}</span>
                        </Row>
                    ))}
                </div>
            )}
        </div>
    )
}
