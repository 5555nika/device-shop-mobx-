import { Card, Col, Image } from "antd"
import type { IDevice } from "../types"
import { useNavigate } from "react-router-dom"
import { DEVICE_ROUTE } from "../constants/routes"

interface DeviceItemProps {
    dev: IDevice
}

export const DeviceItem = ({ dev }: DeviceItemProps) => {
    const navigate = useNavigate()

    const getImgSrc = (img: string) => {
        if (!img) return 'https://placehold.co/300x300?text=No+Image';
        if (img.startsWith('http://') || img.startsWith('https://')) return img;
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const cleanImg = img.startsWith('/') ? img.slice(1) : img;
        return `${apiUrl}/${cleanImg}`;
    }

    return (
        <Col  xs={24} sm={12} md={8} lg={6} >
            <Card hoverable
                onClick={() => navigate(DEVICE_ROUTE + '/' + dev.id)}
                style={{ cursor: 'pointer', border: '1px solid #e0e0e0', borderRadius: '.5rem', overflow: 'hidden' }}
                cover={
                    <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8f8f8' }}>
                        <Image
                            preview={false}
                            style={{ height: '180px', width: '100%', objectFit: 'contain', padding: 8 }}
                            src={getImgSrc(dev.img)}
                            fallback="https://placehold.co/300x300?text=Device+Image"
                            alt={dev.name}
                        />
                    </div>
                }
            >
                <div style={{ fontWeight: 600, fontSize: 14, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={dev.name}>
                    {dev.name}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
                    <span style={{ color: '#555' }}>{dev.price} руб.</span>
                    <span>{dev.rating} ⭐</span>
                </div>
            </Card>
        </Col>
    )
}

