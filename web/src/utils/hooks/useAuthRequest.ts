import { useRequest } from './useRequest'
import { AxiosRequestConfig } from 'axios'
import { useSession } from '@components/Session'

export const useAuthRequest = (endpoint: string, options?: AxiosRequestConfig) => {
    const [{token}] = useSession()
    return useRequest(endpoint, {
        ...options, 
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}