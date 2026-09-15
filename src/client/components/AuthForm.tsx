import { Button, Form, Input, Row, Typography, message, Divider, Space } from "antd"
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
    const { Title, Text } = Typography
    
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
            form.resetFields();
            navigate(SHOP_ROUTE)
            message.success(isLogin ? 'Успешный вход!' : 'Регистрация прошла успешно!')
        } catch (e) {
            const err = e as AxiosError<{ message: string }>;
            message.error(err.response?.data?.message || 'Ошибка авторизации'); 
        }
    }

    const handleQuickLogin = async (role: 'ADMIN' | 'USER') => {
        const demoEmail = role === 'ADMIN' ? 'admin@mobix.com' : 'user@mobix.com'
        const demoUser = {
            id: role === 'ADMIN' ? 1 : 2,
            email: demoEmail,
            role
        }
        localStorage.setItem('token', 'mock-demo-token-jwt')
        localStorage.setItem('mobix_user', JSON.stringify(demoUser))
        user.setUser(demoUser)
        user.setIsAuth(true)
        message.success(`Вы вошли как ${role === 'ADMIN' ? 'Администратор' : 'Пользователь'}!`)
        navigate(SHOP_ROUTE)
    }
    
    return (
        <Form form={form} onFinish={onFinish} layout="vertical">
            <Title level={2} style={{ textAlign: 'center', marginBottom: 24 }}> 
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
                <Input placeholder="name@example.com" size="large" />
            </Form.Item>

            <Form.Item 
                label="Пароль"
                name='password'
                rules={[{ required: true, message: 'Пожалуйста, введите пароль' }]}
            >
                <Input.Password placeholder="Введите пароль" size="large" />
            </Form.Item>

            {isLogin 
            ? <div style={{ marginBottom: 16 }}>Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйся!</NavLink></div>
            : <div style={{ marginBottom: 16 }}>Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink></div>
            }

            <Form.Item>
                <Button type="primary" htmlType="submit" size="large" block>
                    {isLogin ? 'Войти' : 'Зарегистрироваться'}
                </Button>
            </Form.Item>

            <Divider plain style={{ margin: '16px 0' }}>
                <Text type="secondary" style={{ fontSize: 13 }}>Быстрый демо-вход (без пароля)</Text>
            </Divider>

            <Space style={{ width: '100%', justifyContent: 'center' }}>
                <Button onClick={() => handleQuickLogin('USER')}>
                    👤 Как Покупатель
                </Button>
                <Button type="dashed" onClick={() => handleQuickLogin('ADMIN')}>
                    ⚡ Как Админ
                </Button>
            </Space>
        </Form>
    )
})
