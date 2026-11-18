import axios from 'axios';
import type {
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    InternalAxiosRequestConfig
} from 'axios';
import { demoAdapter } from '@/demo/demoAdapter';

// 基础配置
const config: AxiosRequestConfig = {
    // baseURL 由环境变量提供，见 .env.development / .env.production
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
}

// 演示模式（GitHub Pages 等静态托管）：请求在浏览器内由内置示例数据应答
if (import.meta.env.VITE_DEMO_MODE === 'true') {
    config.adapter = demoAdapter
}

// 请求拦截器
const requestInterceptor = (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}

// 响应拦截器
const responseInterceptor = (response: AxiosResponse) => {
    return response.data
}

const errorInterceptor = (error: any) => {
    if (error.response?.status === 401) {
        // token 过期处理
        localStorage.removeItem('token')
        window.location.href = '/login'
    }
    return Promise.reject(error.response?.data || error)
}

// 创建实例
const createAxiosInstance = (): AxiosInstance => {
    const instance = axios.create(config)

    instance.interceptors.request.use(requestInterceptor)
    instance.interceptors.response.use(responseInterceptor, errorInterceptor)

    return instance
}

export const http = createAxiosInstance()