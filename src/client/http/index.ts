import axios, { type InternalAxiosRequestConfig } from "axios";

// axios — для отправки HTTP-запросов (GET, POST и т.д.) на сервер.
// InternalAxiosRequestConfig — это тип данн. для TS, который опис. конфиг. запроса (куда отправляем, какие заголовки и т.д.).

//  для публ. запросов(получ. список товаров, бренды, зайти на стр. логина или зарег., клиент не отпр. никак. паролей или токенов)
export const $host = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

// последующий запрос(доб. товар в корзину, откр. админ-панель, получить личн. данн.)
export const $authHost = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

// перехватчик запроса, прямо перед тем, как запрос уйдет на сервер, берет текущ. конфиг.запроса, заходит в localst, достает оттуда сохр.токен и добавляет его в заголовок запроса ,т.е. надевает бэйдж, мидлеваре смотрит на бэйдж и решает впустить или нет
const AuthInterceptor = (config: InternalAxiosRequestConfig) => {
  // Достаем сохраненный токен из localStorage браузера
    // и вставляем его в заголовок Authorization
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.authorization = `Bearer ${token}`
    }
    return config
}
//  Настраиваем $authHost: "При КАЖДОМ запросе запускай authInterceptor"

$authHost.interceptors.request.use(AuthInterceptor) 
