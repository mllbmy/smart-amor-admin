// 基础响应类型
export interface BaseResponse<T = any> {
    code: number
    data: T
    message: string
    success: boolean
}

// 分页参数
export interface PageParams {
    startPage: number
    size: number
    sort?: string
}

// 分页响应
export interface PageResponse<T = any> {
    records: T[]
    list: T[]
    total: number
    page: number
    size: number
}

// 错误类型
export interface ApiError {
    code: number
    message: string
    timestamp?: string
}