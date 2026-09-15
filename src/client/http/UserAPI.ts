import { $host, $authHost } from "."
import { jwtDecode } from 'jwt-decode'
import type { IUser } from "../types"

// Вспомогательная функция для создания сессии в демо-режиме
const createMockUser = (email: string, role = 'ADMIN'): IUser => {
    return {
        id: 1,
        email: email || 'admin@mobix.com',
        role
    }
}

export const registration = async (email: string, password: string) => {
    try {
        const { data } = await $host.post('/api/user/registration', { email, password, role: 'ADMIN'})
        localStorage.setItem('token', data.token)
        return jwtDecode(data.token) as IUser
    } catch (e) {
        console.warn('Сервер недоступен, регистрация в автономном (демо) режиме:', e)
        const mockUser = createMockUser(email, 'ADMIN')
        localStorage.setItem('token', 'mock-demo-token-jwt')
        localStorage.setItem('mobix_user', JSON.stringify(mockUser))
        return mockUser
    }
}

export const login = async (email: string, password: string) => {
    try {
        const { data } = await $host.post('/api/user/login', { email, password })
        localStorage.setItem('token', data.token)
        return jwtDecode(data.token) as IUser
    } catch (e) {
        console.warn('Сервер недоступен, вход в автономном (демо) режиме:', e)
        const mockUser = createMockUser(email, 'ADMIN')
        localStorage.setItem('token', 'mock-demo-token-jwt')
        localStorage.setItem('mobix_user', JSON.stringify(mockUser))
        return mockUser
    }
}

export const check = async () => {
    const token = localStorage.getItem('token')
    if (!token) return null

    if (token.startsWith('mock-')) {
        const saved = localStorage.getItem('mobix_user')
        if (saved) {
            try { return JSON.parse(saved) as IUser } catch {}
        }
        return createMockUser('admin@mobix.com', 'ADMIN')
    }

    try {
        const { data } = await $authHost.get('/api/user/auth')
        localStorage.setItem('token', data.token)
        return jwtDecode(data.token) as IUser
    } catch (e) {
        console.warn('Сервер недоступен при проверке токена, используем локальную сессию:', e)
        const saved = localStorage.getItem('mobix_user')
        if (saved) {
            try { return JSON.parse(saved) as IUser } catch {}
        }
        return createMockUser('admin@mobix.com', 'ADMIN')
    }
}