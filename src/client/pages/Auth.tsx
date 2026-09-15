import { Layout, Card,Row, Col } from "antd"
import { AuthForm } from "../components/AuthForm"

export const Auth = () => {
    
    return (
            <Row justify='center' align='middle' style={{ height: 'calc(100vh - 64px)' }}>
                <Col xs={22} sm={16} md={10} lg={8}>
                    <Card hoverable>
                        <AuthForm />
                    </Card>
                </Col>
            </Row>          
    )
}