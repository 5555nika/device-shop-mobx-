import { Button, Card, Row, Col, Typography } from "antd"
import { useState } from "react"
import { CreateBrand } from "../components/modals/CreateBrand"
import { CreateDevice } from "../components/modals/CreateDevice"
import { CreateType } from "../components/modals/CreateType"
import { FaTags, FaBuilding, FaPlusCircle } from "react-icons/fa"

const { Title, Paragraph } = Typography

export const Admin = () => {
    // Состояния для открытия каждого окна
    const [isTypeOpen, setIsTypeOpen] = useState(false)
    const [isBrandOpen, setIsBrandOpen] = useState(false)
    const [isDeviceOpen, setIsDeviceOpen] = useState(false)

    return (
            <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%',  padding: '40px 50px', background: '#f0f0f0' }}>
                {/* Заголовок дашборда */}
                <div style={{ marginBottom: 32 }}>
                    <Title level={2} style={{ margin: 0 }}>Панель управления</Title>
                    <Paragraph type="secondary" style={{ fontSize: 16, margin: '8px 0 0 0' }}>
                        Добро пожаловать в админ-панель. Здесь вы можете добавлять новые категории товаров, бренды и заполнять каталог устройств.
                    </Paragraph>
                </div>

                {/* Сетка карточек */}
                <Row gutter={[24, 24]}>
                    {/* Карточка 1: Типы */}
                    <Col xs={24} md={8}>
                        <Card 
                            hoverable
                            style={{ 
                                borderRadius: 12, 
                                height: '100%', 
                                display: 'flex', 
                                flexDirection: 'column', 
                                boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                            }}
                            styles={{ body: { padding: 24, display: 'flex', flexDirection: 'column', flexGrow: 1 } }}
                        >
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', flexGrow: 1 }}>
                                <div style={{ 
                                    background: '#e6f7ff', 
                                    color: '#1890ff', 
                                    width: 64, 
                                    height: 64, 
                                    borderRadius: '50%', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center',
                                    marginBottom: 20,
                                    fontSize: 24
                                }}>
                                    <FaTags />
                                </div>
                                <Title level={4} style={{ marginBottom: 12 }}>Категории (Типы)</Title>
                                <Paragraph type="secondary" style={{ flexGrow: 1, minHeight: 60 }}>
                                    Создавайте новые категории для товаров каталога (например: Смартфоны, Ноутбуки, Планшеты).
                                </Paragraph>
                            </div>
                            <Button 
                                type="primary" 
                                size="large" 
                                block 
                                onClick={() => setIsTypeOpen(true)}
                                style={{ borderRadius: 6, marginTop: 16 }}
                            >
                                Добавить тип
                            </Button>
                        </Card>
                    </Col>

                    {/* Карточка 2: Бренды */}
                    <Col xs={24} md={8}>
                        <Card 
                            hoverable
                            style={{ 
                                borderRadius: 12, 
                                height: '100%', 
                                display: 'flex', 
                                flexDirection: 'column', 
                                boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                            }}
                            styles={{ body: { padding: 24, display: 'flex', flexDirection: 'column', flexGrow: 1 } }}
                        >
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', flexGrow: 1 }}>
                                <div style={{ 
                                    background: '#f6ffed', 
                                    color: '#52c41a', 
                                    width: 64, 
                                    height: 64, 
                                    borderRadius: '50%', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center',
                                    marginBottom: 20,
                                    fontSize: 24
                                }}>
                                    <FaBuilding />
                                </div>
                                <Title level={4} style={{ marginBottom: 12 }}>Бренды</Title>
                                <Paragraph type="secondary" style={{ flexGrow: 1, minHeight: 60 }}>
                                    Добавляйте новых производителей и бренды в систему (например: Apple, Samsung, Xiaomi).
                                </Paragraph>
                            </div>
                            <Button 
                                type="primary" 
                                size="large" 
                                block 
                                onClick={() => setIsBrandOpen(true)}
                                style={{ borderRadius: 6, marginTop: 16 }}
                            >
                                Добавить бренд
                            </Button>
                        </Card>
                    </Col>

                    {/* Карточка 3: Устройства */}
                    <Col xs={24} md={8}>
                        <Card 
                            hoverable
                            style={{ 
                                borderRadius: 12, 
                                height: '100%', 
                                display: 'flex', 
                                flexDirection: 'column', 
                                boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                            }}
                            styles={{ body: { padding: 24, display: 'flex', flexDirection: 'column', flexGrow: 1 } }}
                        >
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', flexGrow: 1 }}>
                                <div style={{ 
                                    background: '#f9f0ff', 
                                    color: '#722ed1', 
                                    width: 64, 
                                    height: 64, 
                                    borderRadius: '50%', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center',
                                    marginBottom: 20,
                                    fontSize: 24
                                }}>
                                    <FaPlusCircle />
                                </div>
                                <Title level={4} style={{ marginBottom: 12 }}>Товары (Устройства)</Title>
                                <Paragraph type="secondary" style={{ flexGrow: 1, minHeight: 60 }}>
                                    Добавляйте конкретные девайсы в каталог, загружайте изображения, назначайте цены и характеристики.
                                </Paragraph>
                            </div>
                            <Button 
                                type="primary" 
                                size="large" 
                                block 
                                onClick={() => setIsDeviceOpen(true)}
                                style={{ borderRadius: 6, marginTop: 16 }}
                            >
                                Добавить устройство
                            </Button>
                        </Card>
                    </Col>
                </Row>

                {/* Модальные окна создания */}
                <CreateType open={isTypeOpen} onCancel={() => setIsTypeOpen(false)} />
                <CreateBrand open={isBrandOpen} onCancel={() => setIsBrandOpen(false)} />
                <CreateDevice open={isDeviceOpen} onCancel={() => setIsDeviceOpen(false)} />
            </div>
    )
}