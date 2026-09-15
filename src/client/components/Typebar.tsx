import { observer } from "mobx-react-lite"
import { useStore } from "../context"
import { Button, Row } from "antd"

export const Typebar = observer(() => {

    const { device } = useStore()

    return (
        <Row style={{cursor: 'pointer', display: 'flex', flexDirection: 'column', width: '100%', marginBottom: '2rem' }}>
            {device.types.map(type => 
                <Button
                key={type.id}
                type={type.id === device.selectedType?.id ? 'primary' : 'default'}
                onClick={() => device.setSelectedType(type)}
                    >{type.name}
                </Button>
            )}
        </Row>
    )
})

