import { useAxios } from './useAxios'
import { AxiosRequestConfig } from 'axios'

export const useRequest = (endpoint: string, options?: AxiosRequestConfig) => {
    return useAxios(process.env.REACT_APP_API_BASE_URL!, endpoint, {
        withCredentials: true, 
        ...options
    })
}