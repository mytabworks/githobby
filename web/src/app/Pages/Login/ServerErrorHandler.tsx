import React, { useEffect } from 'react'
import { useFormField } from 'formydable'
import { useRequest } from '@utils/hooks/useRequest'
import Alert from '@components/Alert'
import { Variant } from '@components/types'
interface ServerErrorHandlerProps {
    request: ReturnType<typeof useRequest>
}

const expectedMessages = ["Invalid user", "Incorrect password"]

const ServerErrorHandler: React.FunctionComponent<ServerErrorHandlerProps> = ({request}) => {
    const { setFieldError } = useFormField()

    useEffect(() => {
        if(request.value?.status === "error" && expectedMessages.includes(request.value?.message)) {
            if(request.value?.message === expectedMessages[0]) {
                setFieldError("email", request.value?.message)
            } else {
                setFieldError("password", request.value?.message)
            }
        }
    }, [request.value])

    const showError = (request.value?.status === "error" && 
    !expectedMessages.includes(request.value?.message)) || 
    !!request.error

    return (
        <Alert variant={Variant.Secondary} in={showError}>
            {request.error || request.value?.message}
        </Alert>
    )
}

export default ServerErrorHandler
