import { useState } from "react";
import axios, { AxiosRequestConfig } from "axios";

interface UseRequestStates<P> {
    initial: boolean;
    loading: boolean;
    complete: boolean;
    error: string | null;
    value: P | null
}

export const useRequest = <P = any>(endpoint: string, options: AxiosRequestConfig = { method: "GET" }) => {
    const [states, setStates] = useState<UseRequestStates<P>>({
        initial: true,
        loading: true,
        complete: false,
        error: null,
        value: null
    })
    return {
        ...states,
        call(overideOptions?: AxiosRequestConfig) {
            setStates((prev) => ({
                ...prev, 
                loading: true, 
                complete: false, 
            }))
            return axios({
                url: `${process.env.REACT_APP_API_BASE_URL}${endpoint}`,
                ...options,
                ...overideOptions
            })
            .then((response: any) => {
                setStates((prev) => ({
                    ...prev, 
                    initial: false,
                    loading: false, 
                    complete: true, 
                    value: response
                }))
                return response
            })
            .catch((error: Error) => {
                setStates((prev) => ({
                    ...prev, 
                    initial: false,
                    loading: false, 
                    complete: true, 
                    error: error.message
                }))
            })
        }
    }
}