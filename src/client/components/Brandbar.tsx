import { Button, Typography } from "antd"
import { useStore } from "../context"
import { observer } from "mobx-react-lite"

export const Brandbar = observer(() => {
    const { device } = useStore()

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8, padding: '12px 16px', background: '#fafafa', borderRadius: 8, border: '1px solid #f0f0f0' }}>
            <Typography.Text strong style={{ marginRight: 8 }}>Бренды:</Typography.Text>
            
            <Button 
                type={!device.selectedBrand ? 'primary' : 'default'}
                onClick={() => device.setSelectedBrand(null)}
            >
                Все бренды
            </Button>

            {device.brands.map(brand => 
                <Button 
                    key={brand.id}
                    type={brand.id === device.selectedBrand?.id ? 'primary' : 'default'}
                    onClick={() => device.setSelectedBrand(brand)}
                >
                    {brand.name} 
                </Button>
            )} 
        </div>
    ) 
})