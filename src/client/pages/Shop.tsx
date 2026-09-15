import { Col, Row } from "antd"
import { Brandbar } from "../components/Brandbar"
import { Typebar } from "../components/Typebar"
import { DeviceList } from "../components/DeviceList"
import { observer } from "mobx-react-lite"

export const Shop = observer(() => {
    return (
        <div style={{ padding: '20px'}}>
            <Row gutter={[24, 24]}>
                <Col xs={24} sm={8} md={6}> <Typebar /></Col>
                <Col xs={24} sm={16} md={18}> <Brandbar />
                    <div style={{ marginTop: '24px' }}><DeviceList /></div>
                </Col>
            </Row>            
        </div>
    )
})
