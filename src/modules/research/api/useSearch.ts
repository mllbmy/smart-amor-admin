import { ref, type Ref } from 'vue'
import { message } from 'ant-design-vue'
import { safeParseJSON } from '@/utils/tools';

export interface UseSaerch<T> {
    resultData: T | null;
    isLoading: Ref<boolean, boolean>;
    loadFromStorage: () => void;
    saveToStorage: (data: T) => void;
    executeSearch: (searchData: any) => Promise<T | null>;
    cancelSearch: () => void;
    cleanup: () => void;
}

interface SearchOptions {
    storageKey: string
    searchFunction: (data: any, signal?: AbortSignal) => Promise<{ success: boolean; data: string }>
    validateFunction?: (data: any) => boolean
}

export function useSearch<T>(
    options: SearchOptions
) {
    const { storageKey, searchFunction, validateFunction } = options
    const resultData = ref<T | null>(null)
    const isLoading = ref(false)
    // 添加 AbortController 实例
    const abortController = ref<AbortController | null>(null)

    // 从本地存储加载数据
    const loadFromStorage = () => {
        try {
            const stored = localStorage.getItem(storageKey)
            if (stored && stored !== 'null' && stored.trim()) {
                resultData.value = JSON.parse(stored)
            }
        } catch (error) {
            console.error(`Failed to load ${storageKey} from storage:`, error)
            localStorage.removeItem(storageKey)
        }
    }

    // 保存到本地存储
    const saveToStorage = (data: T) => {

        try {
            localStorage.setItem(storageKey, JSON.stringify(data))
        } catch (error) {
            console.error(`Failed to save ${storageKey} to storage:`, error)
        }
    }

    const baseValidateFunction = (value: any) => {
        if (!value || value.trim() === '') {
            message.error('请输入搜索内容！')
            return false
        }
        return true
    }

    // 取消搜索的方法
    const cancelSearch = () => {
        if (abortController.value) {
            abortController.value.abort()
            abortController.value = null
            isLoading.value = false
            message.destroy('searchLoading')
            console.log('搜索已取消')
        }
    }

    // 执行搜索
    const executeSearch = async (searchData: any): Promise<T | null> => {
        // 如果正在搜索，先取消之前的请求
        if (isLoading.value && abortController.value) {
            cancelSearch()
        }

        if (!baseValidateFunction(searchData.value)) {
            return null
        }
        if (validateFunction && !validateFunction(searchData)) {
            return null
        }

        abortController.value = new AbortController()
        isLoading.value = true

        try {
            message.loading({
                content: 'AI分析中,这个过程可能需要一段时间...',
                key: 'searchLoading',
                duration: 0,
            })

            const results = await searchFunction(searchData, abortController.value.signal)
            message.destroy('searchLoading')

            if (!results.success) {
                message.error('搜索失败!')
                return null
            }

            if (results.data === '服务暂时不可用，请稍后重试') {
                message.error(results.data)
                return null
            }

            message.success('搜索成功')
            return safeParseJSON(results.data) as T
        } catch (error: any) {

            if (error.code === "ERR_CANCELED") {
                console.log('搜索取消')
                return null
            }

            console.error('搜索失败:', error)
            message.error('搜索失败')
            return null
        } finally {
            isLoading.value = false
            abortController.value = null
        }
    }

    // 在组件卸载时取消请求
    const cleanup = () => {
        if (abortController.value) {
            cancelSearch()
        }
    }

    return {
        resultData,
        isLoading,
        loadFromStorage,
        saveToStorage,
        executeSearch,
        cancelSearch,
        cleanup,
    }
}