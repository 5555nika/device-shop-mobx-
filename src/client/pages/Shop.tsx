import { useEffect } from "react"
import { Col, Row } from "antd"
import { Brandbar } from "../components/Brandbar"
import { Typebar } from "../components/Typebar"
import { DeviceList } from "../components/DeviceList"
import { observer } from "mobx-react-lite"
import { useStore } from "../context"
import { fetchBrands, fetchDevices, fetchTypes } from "../http/DeviceAPI"

export const Shop = observer(() => {
    const { device } = useStore()

    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data))
        fetchBrands().then(data => device.setBrands(data))
        fetchDevices(undefined, undefined, 1, device.limit).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        })
    }, [])

    useEffect(() => {
        fetchDevices(device.selectedType?.id, device.selectedBrand?.id, device.page, device.limit).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        })
    }, [device.selectedType, device.selectedBrand, device.page])

    return (
        <div style={{ padding: '24px 32px', maxWidth: 1400, margin: '0 auto' }}>
            <Row gutter={[24, 24]}>
                <Col xs={24} sm={8} md={6}>
                    <Typebar />
                </Col>
                <Col xs={24} sm={16} md={18}>
                    <Brandbar />
                    <div style={{ marginTop: '24px' }}>
                        <DeviceList />
                    </div>
                </Col>
            </Row> 
        </div>
    )
})
