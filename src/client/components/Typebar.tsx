import { observer } from "mobx-react-lite"
import { useStore } from "../context"
import { Button, Typography } from "antd"

export const Typebar = observer(() => {
    const { device } = useStore()

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, background: '#fafafa', padding: 16, borderRadius: 8, border: '1px solid #f0f0f0' }}>
            <Typography.Title level={5} style={{ margin: '0 0 8px 0' }}>Категории</Typography.Title>
            
            <Button block
                type={!device.selectedType ? 'primary' : 'default'}
                onClick={() => device.setSelectedType(null)}
            >
                Все категории
            </Button>

            {device.types.map(type => 
                <Button block
                    key={type.id}
                    type={type.id === device.selectedType?.id ? 'primary' : 'default'}
                    onClick={() => device.setSelectedType(type)}
                >
                    {type.name}
                </Button>
            )}
        </div>
    )
})
