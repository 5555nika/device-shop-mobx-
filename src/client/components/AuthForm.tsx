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
    const navigate = useNavigate() // программный хук перехода между страницами
    const location = useLocation() // Узнаем тек. URL стр. в браузере
    const [form] = Form.useForm()


// Проверяем: если текущий адрес === '/login', значит это режим входа (isLogin = true)
// Если адрес === '/registration', значит это режим регистрации (isLogin = false)

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
            user.setUser(data)  // Пользователь успешно зарегистрирован
            user.setIsAuth(true)  // Вы вошли в систему!
            form.resetFields();
            navigate(SHOP_ROUTE) // Переходим на главную
            message.success(isLogin ? 'Успешный вход!' : 'Регистрация прошла успешно!')
        } catch (e) {
            const err = e as AxiosError<{ message: string }>;
            message.error(err.response?.data?.message || 'Ошибка авторизации'); 

            /*
            Получение ошибки от сервера - в случае ошибки (например, статус ответа 400 или 401) Axios выбрасывает объект ошибки e.
            e.response — это объект ответа, который вернул наш сервер.
            e.response.data — это тело ответа сервера в формате JSON.
            e.response.data.message — это конкретный текст ошибки, который написал программист на бэкенде.
            Пример:('Польз. с таким email уже сущ.') как раз и окажется внутри переменной e.response.data.message.
            '?'- позвол. безоп. проверить наличие полей. Если сервер вообще откл. или интернета нет, у ошибки e не будет объекта response (он будет undefined).Выражение: undefined || 'Произошла ошибка...'
            Результат: 'Произошла ошибка при аутентификации' (выведет запасной текст).
            ||  Если сервер вообще откл. или интерн. нет, у ошибки e не будет объекта response запишется понятный текст по умолчанию
            "?"- мягко выведет undef., "||" - запасн.вариант
            */
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
