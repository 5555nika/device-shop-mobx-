import { observer } from "mobx-react-lite"
import { useStore } from "../context"
import { Button, Typography, Space } from "antd"

export const Typebar = observer(() => {
    const { device } = useStore()

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', background: '#fafafa', padding: '16px', borderRadius: '8px', border: '1px solid #f0f0f0' }}>
            <Typography.Title level={5} style={{ margin: '0 0 4px 0' }}>Категории</Typography.Title>
            
            <Button
                type={!device.selectedType ? 'primary' : 'default'}
                block
                style={{ textAlign: 'left', fontWeight: !device.selectedType ? 600 : 400 }}
                onClick={() => device.setSelectedType(null as any)}
            >
                ✨ Все категории
            </Button>

            {device.types.map(type => 
                <Button
                    key={type.id}
                    type={type.id === device.selectedType?.id ? 'primary' : 'default'}
                    block
                    style={{ textAlign: 'left' }}
                    onClick={() => {
                        if (device.selectedType?.id === type.id) {
                            device.setSelectedType(null as any)
                        } else {
                            device.setSelectedType(type)
                        }
                    }}
                >
                    {type.name}
                </Button>
            )}
        </div>
    )
})
