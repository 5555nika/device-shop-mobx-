import { observer } from "mobx-react-lite"
import { useStore } from "../context"
import { Row } from "antd"
import { DeviceItem } from "./DeviceItem"

export const DeviceList = observer(() => {
    const { device } = useStore()

    return (
        <Row gutter={[16, 16]}>
            {device.devices && device.devices.map(dev => 
                <DeviceItem key={dev.id} dev={dev} />           
            )}
        </Row>
    )
})