import React from 'react'
import { FormEventType, FormProvider } from 'formydable'
import Input from '@components/FormValidated/Input'
import Button from '@components/Button'
import Card from '@components/Card'
import { SessionActionType, useSession } from '@components/Session'
import { Variant } from '@components/types'
import Text from '@components/Text'
import icon from '@images/icon-150x150.png'
import { useRequest } from '@utils/hooks/useRequest'
import ServerErrorHandler from '@app/Pages/Login/ServerErrorHandler'
import './index.scss'

const Login: React.FunctionComponent = () => {
    const [, dispatch] = useSession()
    const request = useRequest('/admin/login', { method: "POST" })

    const handleSubmit = (event: FormEventType) => {
        if(event.isReady()) {
            request.call({
                data: event.json()
            }).then(response => {
                if(response.data?.status === "ok") {
                    dispatch({ 
                        type: SessionActionType.SET_TOKEN,
                        payload: response.data.accessToken
                    })
                }
            })
        }
    }
    
    return (
        <div className="admin-login">
            <Card variant={Variant.Primary}>
                <Card.Body className="admin-form">
                    <Text as="p" align="center">
                        <img src={icon} alt="githobby" />
                    </Text>
                    <FormProvider onSubmit={handleSubmit}>
                        <ServerErrorHandler request={request} />
                        <Input name="email" label="E-mail" rules="required|email" placeholder="enter your email..." disabled={request.loading}/>
                        <Input name="password" label="Password" rules="required" placeholder="enter your password..." type="password" disabled={request.loading}/>
                        <Button block variant={Variant.Secondary} type="submit" className="mt-5" loading={request.loading}>SUBMIT</Button>
                    </FormProvider>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Login
