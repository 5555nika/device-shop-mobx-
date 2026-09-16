import { Button, Form, Input, Row, Typography, message } from "antd"
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../constants/routes"
import { useStore } from "../context"
import { observer } from "mobx-react-lite"
import { login, registration } from "../http/UserAPI"
import type { IUserAuth } from "../types"
import type { AxiosError } from "axios"

export const AuthForm = observer(() => {
    const { user } = useStore()
    const navigate = useNavigate()
    const location = useLocation()
    const [form] = Form.useForm()

    const isLogin = location.pathname === LOGIN_ROUTE
    const { Title } = Typography
    
    const onFinish = async (values: IUserAuth) => {
        try {
            let data;
            if (isLogin) {
                data = await login(values.email, values.password)
            } else {
                data = await registration(values.email, values.password)
            }
            user.setUser(data)
            user.setIsAuth(true)
            form.resetFields()
            navigate(SHOP_ROUTE)
            message.success(isLogin ? 'Успешный вход!' : 'Регистрация прошла успешно!')
        } catch (e) {
            const err = e as AxiosError<{ message: string }>
            message.error(err.response?.data?.message || 'Ошибка авторизации')
        }
    }
    
    return (
        <Form form={form} onFinish={onFinish}>
            <Title level={2} style={{ textAlign: 'center'}}> 
                {isLogin ? 'Авторизация' : 'Регистрация'}
            </Title>
        
            <Form.Item 
                label="Email"
                name='email'
                rules={[
                    { required: true, message: 'Пожалуйста, введите email' },
                    { type: 'email', message: 'Пожалуйста, введите корректный email!' }
                ]}
            >
                <Input placeholder="Введите email" />
            </Form.Item>

            <Form.Item 
                label="Пароль"
                name='password'
                rules={[{ required: true, message: 'Пожалуйста, введите пароль' }]}
            >
                <Input.Password placeholder="Введите пароль" />
            </Form.Item>

            {isLogin 
            ? <div style={{ marginBottom: 12 }}>Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйся!</NavLink></div>
            : <div style={{ marginBottom: 12 }}>Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink></div>
            }

            <Row justify='end'>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        {isLogin ? 'Войти' : 'Регистрация'}
                    </Button>
                </Form.Item>
            </Row>
        </Form>
    )
})
