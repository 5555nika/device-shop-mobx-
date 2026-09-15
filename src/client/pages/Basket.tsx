import { Layout, Row, Col, Button, Card, List, Image, Typography, Spin, Empty, message } from 'antd'
import { useEffect, useState } from 'react'
import type { IBasketDevice } from '../types'
import { fetchBasket, removeFromBasket, clearBasket } from '../http/DeviceAPI'
import { FaTrash, FaShoppingCart, FaCreditCard } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { SHOP_ROUTE } from '../constants/routes'

const { Title, Text } = Typography

export const Basket = () => {
    const [basketItems, setBasketItems] = useState<IBasketDevice[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()

    const loadBasket = async () => {
        try {
            setIsLoading(true)
            const data = await fetchBasket()
            setBasketItems(data)
        } catch (err: any) {
            console.error("Ошибка при загрузке корзины:", err)
            message.error(err.response?.data?.message || "Не удалось загрузить корзину")
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        loadBasket()
    }, [])

    const handleRemoveItem = async (deviceId: number) => {
        try {
            await removeFromBasket(deviceId)
            // Фильтруем из стейта удаленное устройство
            setBasketItems(prev => prev.filter(item => item.deviceId !== deviceId))
            message.success("Товар удален из корзины")
        } catch (err: any) {
            message.error(err.response?.data?.message || "Ошибка при удалении товара")
        }
    }

    const handleClearBasket = async () => {
        try {
            await clearBasket()
            setBasketItems([])
            message.success("Корзина успешно очищена")
        } catch (err: any) {
            message.error(err.response?.data?.message || "Ошибка при очистке корзины")
        }
    }

    const handleCheckout = () => {
        // Оформление заказа (имитация)
        message.loading({ content: 'Оформление заказа...', key: 'checkout' })
        setTimeout(async () => {
            try {
                await clearBasket()
                setBasketItems([])
                message.success({ content: 'Заказ успешно оформлен! Спасибо за покупку.', key: 'checkout', duration: 4 })
            } catch (err) {
                message.error({ content: 'Не удалось завершить оформление заказа', key: 'checkout' })
            }
        }, 1500)
    }

    const totalPrice = basketItems.reduce((sum, item) => sum + (item.device?.price || 0), 0)

    if (isLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
                <Spin size="large" tip="Загрузка корзины..." />
            </div>
        )
    }

    return (
        <Layout style={{ padding: '24px 50px', background: '#f5f5f5', minHeight: 'calc(100vh - 64px)' }}>
            <Row justify="center">
                <Col xs={24} xl={20}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24, gap: 12 }}>
                        <FaShoppingCart size={28} style={{ color: '#1890ff' }} />
                        <Title level={2} style={{ margin: 0 }}>Моя корзина</Title>
                    </div>

                    {basketItems.length === 0 ? (
                        <Card style={{ textAlign: 'center', borderRadius: 8, padding: '40px 0' }}>
                            <Empty 
                                description="Ваша корзина пока пуста" 
                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                            />
                            <Button type="primary" size="large" style={{ marginTop: 16 }} onClick={() => navigate(SHOP_ROUTE)}>
                                Перейти к покупкам
                            </Button>
                        </Card>
                    ) : (
                        <Row gutter={[24, 24]}>
                            {/* Список товаров в корзине */}
                            <Col xs={24} lg={15}>
                                <List
                                    itemLayout="vertical"
                                    dataSource={basketItems}
                                    renderItem={(item) => (
                                        <Card 
                                            key={item.id} 
                                            hoverable 
                                            style={{ marginBottom: 16, borderRadius: 8 }}
                                            bodyStyle={{ padding: 16 }}
                                        >
                                            <div style={{ display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap' }}>
                                                {/* Изображение */}
                                                <div style={{ width: 100, height: 100, display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#fafafa', borderRadius: 6 }}>
                                                    <Image
                                                        width={80}
                                                        height={80}
                                                        src={item.device?.img ? 'http://localhost:5000/' + item.device.img : ''}
                                                        alt={item.device?.name}
                                                        preview={false}
                                                        style={{ objectFit: 'contain' }}
                                                    />
                                                </div>

                                                {/* Описание товара */}
                                                <div style={{ flex: 1, minWidth: 200 }}>
                                                    <Title level={4} style={{ margin: '0 0 8px 0' }}>{item.device?.name}</Title>
                                                    <Text type="secondary">Количество: 1 шт.</Text>
                                                </div>

                                                {/* Цена */}
                                                <div style={{ textAlign: 'right', minWidth: 100 }}>
                                                    <Title level={4} style={{ margin: 0, color: '#f5222d' }}>
                                                        {item.device?.price ? item.device.price.toLocaleString() : 0} руб.
                                                    </Title>
                                                </div>

                                                {/* Кнопка удаления */}
                                                <div>
                                                    <Button 
                                                        type="text" 
                                                        danger 
                                                        icon={<FaTrash />} 
                                                        onClick={() => handleRemoveItem(item.deviceId!)}
                                                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                                    />
                                                </div>
                                            </div>
                                        </Card>
                                    )}
                                />
                            </Col>

                            {/* Итоговая панель */}
                            <Col xs={24} lg={9}>
                                <Card style={{ borderRadius: 8, position: 'sticky', top: 24, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                                    <Title level={3} style={{ borderBottom: '1px solid #f0f0f0', paddingBottom: 16, margin: 0 }}>Итого</Title>
                                    
                                    <div style={{ display: 'flex', justifyContent: 'space-between', margin: '20px 0' }}>
                                        <Text style={{ fontSize: 16 }}>Количество товаров:</Text>
                                        <Text strong>{basketItems.length} шт.</Text>
                                    </div>
                                    
                                    <div style={{ display: 'flex', justifyContent: 'space-between', margin: '20px 0', alignItems: 'baseline' }}>
                                        <Text style={{ fontSize: 16 }}>Сумма заказа:</Text>
                                        <Title level={3} style={{ margin: 0, color: '#f5222d' }}>{totalPrice.toLocaleString()} руб.</Title>
                                    </div>

                                    <Button 
                                        type="primary" 
                                        size="large" 
                                        block 
                                        icon={<FaCreditCard style={{ marginRight: 8 }} />}
                                        onClick={handleCheckout}
                                        style={{ height: 50, fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}
                                    >
                                        Оформить заказ
                                    </Button>

                                    <Button 
                                        danger 
                                        block 
                                        onClick={handleClearBasket}
                                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                    >
                                        Очистить корзину
                                    </Button>
                                </Card>
                            </Col>
                        </Row>
                    )}
                </Col>
            </Row>
        </Layout>
    )
}