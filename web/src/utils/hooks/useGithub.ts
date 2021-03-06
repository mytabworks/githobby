import { useAxios } from './useAxios'
import { AxiosRequestConfig } from 'axios'

export const useGithub = (endpoint: string, options?: AxiosRequestConfig) => {
    const defaultOption = { 
        headers: { 
            "Accept": "application/vnd.github.mercy-preview+json",
        },
        paramsSerializer: (params: any) => {
            return Object.keys(params).reduce((result, key) => {
                return `${result}&${key}=${encodeURIComponent(params[key])}`
            }, "").substr(1)
        }
      
    }
    return useAxios(process.env.REACT_APP_GITHUB_API!, endpoint, { ...defaultOption, ...options})
}