import { useEffect } from "react"
import { SessionActionType, useSession } from "@components/Session"
import { useAuthRequest } from "./useAuthRequest"

export const useRefreshToken = () => {
    const [, dispatch] = useSession()
    const requestToken = useAuthRequest("/refresh_token", {
        method: "POST"
    })
    useEffect(() => {
        const callback = () => {
            requestToken.call().then(response => {
                if(response.data.status === "ok") {
                    dispatch({ 
                        type: SessionActionType.SET_TOKEN,
                        payload: response.data.accessToken
                    })
                }
            })
        }
        callback()
        const cleanup = setInterval(callback, 60000 * 15)

        return () => {
            clearInterval(cleanup)
        }
    }, [])
}