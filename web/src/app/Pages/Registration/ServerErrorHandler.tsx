import React, { useEffect } from 'react'
import { useFormField } from 'formydable'
import { useRequest } from '@utils/hooks/useRequest'
import Alert from '@components/Alert'
import { Variant } from '@components/types'
import { Prompt } from 'react-router-dom'
interface ServerErrorHandlerProps {
    request: ReturnType<typeof useRequest>
}

const expectedMessages = ["E-mail was already taken", "Username doesn't exist on github"]

const ServerErrorHandler: React.FunctionComponent<ServerErrorHandlerProps> = ({request}) => {
    const { setFieldError, dirty } = useFormField()
    
    useEffect(() => {
        if(request.value?.status === "error" && expectedMessages.includes(request.value?.message)) {
            if(request.value?.message === expectedMessages[0]) {
                setFieldError("email", request.value?.message)
            }

            if(request.value?.message === expectedMessages[1]) {
                setFieldError("name", request.value?.message)
            }
        }
    }, [request.value])

    const showError = (request.value?.status === "error" && 
    !expectedMessages.includes(request.value?.message)) || 
    !!request.error

    return (
        <>
            <Prompt
                when={dirty}
                message="Are you sure you want to leave?"
                />
            <Alert variant={Variant.Secondary} in={showError}>
                {request.error || request.value?.message}
            </Alert>
        </>
    )
}

export default ServerErrorHandler
