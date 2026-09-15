import { observer } from "mobx-react-lite";
import { useStore } from "../context";
import { useNavigate } from "react-router-dom";
import { Button, Grid, Space, Typography } from 'antd'
import { ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from "../constants/routes";
import { LockOutlined, LogoutOutlined, ShopOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons'

const { Text } = Typography
const { useBreakpoint } = Grid 

export const Navbar = observer(() => {
    const { user } = useStore()
    const navigate = useNavigate()
    const screens = useBreakpoint();
    const isMobile = screens.xs;

    const logOut = () => {
        localStorage.removeItem('token')
        user.setIsAuth(false)
        user.setUser(null)
        navigate(SHOP_ROUTE)
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <Space  style={{ cursor: 'pointer' }} onClick={() => navigate(SHOP_ROUTE)}>
                <ShopOutlined style={{ fontSize: '24px', color: '#1677ff' }} />
                {!isMobile && <Text  style={{ color: '#fff', fontSize: '20px', fontWeight: 'bold' }}> КупиДевайс</Text>}
            </Space>

            {user.isAuth ?(
            <Space> 
                <Button
                type="dashed" ghost
                icon={<LockOutlined />}
                onClick={() => navigate(ADMIN_ROUTE)}
                >
                    {!isMobile && 'Админ панель'}
                </Button>

                <Button
                type='primary' 
                icon={<ShoppingCartOutlined />}
                onClick={() => navigate(BASKET_ROUTE)}
                >
                    {!isMobile && 'Корзина'}
                </Button>

                <Button
                danger 
                icon={<LogoutOutlined />}
                onClick={logOut}
                >
                    {!isMobile && 'Выйти'}
                </Button>
            </Space>

            ) : (
                <Button
                type="primary"
                icon={<UserOutlined />}
                onClick={() => navigate(LOGIN_ROUTE)}
                > 
                    Авторизация
                </Button>
            )
        }
        </div>

    )

})