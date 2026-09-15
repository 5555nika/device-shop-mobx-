import { Button, Row } from "antd"
import { useStore } from "../context"
import { observer } from "mobx-react-lite"

export const Brandbar = observer(() => {

    
    const { device } = useStore()
    
        
    return (
        <Row  style={{cursor: 'pointer', gap:'2rem', marginLeft: '2rem'}} >
            {device.brands.map(brand => 
                <Button 
                key={brand.id}
                onClick={() => device.setSelectedBrand(brand)}
                style={{borderColor: brand.id  === device.selectedBrand?.id? 'red' : ''}}
                >
                {brand.name}                   
                </Button>
            )}           
        </Row>
    )   
})