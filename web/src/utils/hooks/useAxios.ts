import { useState } from "react";
import axios, { AxiosRequestConfig } from "axios";

export interface UseAxiosStates<P> {
    initial: boolean;
    loading: boolean;
    complete: boolean;
    error: string | null;
    value: P | null
}

export const useAxios = <P = any>(baseurl: string, endpoint: string, options: AxiosRequestConfig = { method: "GET" }) => {
    const [states, setStates] = useState<UseAxiosStates<P>>({
        initial: true,
        loading: false,
        complete: true,
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
                url: `${baseurl}${endpoint}`,
                ...options,
                ...overideOptions
            })
            .then((response: any) => {
                setStates((prev) => ({
                    ...prev, 
                    initial: false,
                    loading: false, 
                    complete: true, 
                    value: response.data
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