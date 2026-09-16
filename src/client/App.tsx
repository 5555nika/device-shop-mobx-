import { Layout, Skeleton } from 'antd'
import './App.css'
import { AppRouter } from './components/AppRouter'
import { Navbar } from './components/Navbar'
import { useEffect, useState } from 'react'
import { check } from './http/UserAPI'
import { observer } from 'mobx-react-lite'
import { useStore } from './context'
import type { IJwtPayload, IUser } from './types'

export const App = observer(() => {

  const { user } = useStore()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        setIsLoading(false)
        return
      }

      try {
        const data: IJwtPayload | null  = await check() as IJwtPayload | null
        if (data && typeof data === 'object' && typeof data.exp === 'number') {
          const expDate = new Date(data.exp * 1000)
          console.log('Токен действителен до:', expDate.toLocaleString())
        }
        user.setUser(data as IUser)
        user.setIsAuth(true)
      } catch (e) {
        console.error('Ошибка проверки авторизации:', e)
        localStorage.removeItem('token') 
      } finally {
        setIsLoading(false)
      }
    }
    checkAuth()

  }, [])

  if (isLoading) {
    return (
      <Layout style={{ padding: '24px' }}>
        <Skeleton active paragraph={{ rows: 4 }} />
      </Layout>
    )
  }

  return (
    <Layout style={{ background: '#fff'}}>
      <Layout.Header>
        <Navbar />
      </Layout.Header>
      <Layout.Content>
        <AppRouter />
      </Layout.Content>
    </Layout> 
  )
})
