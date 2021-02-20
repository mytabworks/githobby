import { useEffect } from "react"
import { SessionActionType, useSession } from "@components/Session"
import { useAuthRequest } from "./useAuthRequest"

export const useRecieveUser = () => {
    const [{initial, token}, dispatch] = useSession()
    const requestUser = useAuthRequest('/user')
    useEffect(() => {
        if(!initial) {
            if(token) {
                requestUser.call().then(response => {
                    dispatch({ 
                        type: SessionActionType.SET_USER,
                        payload: response.data?.user || null
                    })
                })
            } else {
                dispatch({ 
                    type: SessionActionType.SET_USER,
                    payload: null
                })
            }
        }
    }, [token, initial])
}