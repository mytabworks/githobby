import React from 'react'
import { FormEventType, FormProvider } from 'formydable'
import { useHistory } from 'react-router-dom'
import Row from '@components/Layout/Row'
import Col from '@components/Layout/Col'
import Input from '@components/FormValidated/Input'
import Button from '@components/Button'
import Card from '@components/Card'
import Alert from '@components/Alert'
import { SessionActionType, useSession } from '@components/Session'
import { Variant } from '@components/types'
import { useRequest } from '@utils/hooks/useRequest'
import ServerErrorHandler from './ServerErrorHandler'

const Login: React.FunctionComponent = () => {
    const [, dispatch] = useSession()
    const request = useRequest('/login', { method: "post" })
    const history = useHistory<any>()

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
        <div className="pt-5">
            <Row>
                <Col sm={{ offset: 1, span: 10}} lg={{ offset: 3, span: 6}}>
                    <Card className="mt-4" variant={Variant.Primary}>
                        <Card.Header>
                            <h3 className="mb-0">login</h3>
                        </Card.Header>
                        <Card.Body className="p-5">
                            <FormProvider onSubmit={handleSubmit}>
                                <Alert in={!!history.location.state?.success} variant={Variant.Success}>
                                    {history.location?.state?.success}
                                </Alert>
                                <ServerErrorHandler request={request} />
                                <Input name="email" label="E-mail" rules="required|email" placeholder="enter your email..." disabled={request.loading}/>
                                <Input name="password" label="Password" rules="required" placeholder="enter your password..." type="password" disabled={request.loading}/>
                                <Button block variant={Variant.Secondary} type="submit" className="mt-5" loading={request.loading}>SUBMIT</Button>
                            </FormProvider>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default Login
