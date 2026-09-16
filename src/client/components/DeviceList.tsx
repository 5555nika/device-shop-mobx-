import { observer } from "mobx-react-lite"
import { useStore } from "../context"
import { Row, Empty, Pagination } from "antd"
import { DeviceItem } from "./DeviceItem"

export const DeviceList = observer(() => {
    const { device } = useStore()

    if (!device.devices || device.devices.length === 0) {
        return (
            <div style={{ padding: '48px 0', textAlign: 'center' }}>
                <Empty description="В выбранной категории или бренде пока нет товаров" />
            </div>
        )
    }

    return (
        <Row gutter={[16, 16]}>
            {device.devices.map(dev => 
                <DeviceItem key={dev.id} dev={dev} />           
            )}
            <Pagination current={device.page} total={device.totalCount} pageSize={device.limit} onChange={(p) => device.setPage(p)} />
        </Row>
    )
})

