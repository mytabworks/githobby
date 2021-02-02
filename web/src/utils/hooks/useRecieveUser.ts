import { useEffect } from "react"
import { SessionActionType, useSession } from "@components/Session"
import { useAuthRequest } from "./useAuthRequest"

export const useRecieveUser = () => {
    const [{token}, dispatch] = useSession()
    const requestUser = useAuthRequest('/user')
    useEffect(() => {
        requestUser.call().then(response => {
            if(!(response instanceof Error) && ["ok", "error"].includes(response.data?.status)) {
                dispatch({ 
                    type: SessionActionType.SET_USER,
                    payload: response.data.user
                })
            }
        })
    }, [token])
}