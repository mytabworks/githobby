import React, { useEffect } from 'react'
import { FormEventType, FormProvider } from 'formydable'
import { useHistory } from 'react-router-dom'
import Row from '@components/Layout/Row'
import Col from '@components/Layout/Col'
import Input from '@components/FormValidated/Input'
import Button from '@components/Button'
import Card from '@components/Card'
import HeadGear from '@components/HeadGear'
import { Variant } from '@components/types'
import { useRequest } from '@utils/hooks/useRequest'
import ServerErrorHandler from './ServerErrorHandler'

const Register: React.FunctionComponent = () => {
    const request = useRequest('/registration', { method: "post" })
    const history = useHistory()
    
    useEffect(() => {
        if(request.value?.status === "ok") {
            history.push('/login', { 
                success: "Successfully registered an account. you can login now." 
            })
        }
    }, [request.value])

    const handleSubmit = (event: FormEventType) => {
        if(event.isReady()) {
            request.call({
                data: event.json()
            })
        }
    }
    
    return (
        <div className="pt-5">
            <HeadGear
                title="Githobby | Registration"
                description="githobby registration"
                />
            <Row>
                <Col sm={{ offset: 1, span: 10}} lg={{ offset: 3, span: 6}}>
                    <Card className="mt-4" variant={Variant.Primary}>
                        <Card.Header>
                            <h3 className="mb-0">registration</h3>
                        </Card.Header>
                        <Card.Body className="p-5">
                            <FormProvider onSubmit={handleSubmit}>
                                <ServerErrorHandler request={request} />
                                <Input name="name" label="Github Username" rules="required" placeholder="enter your github username..." disabled={request.loading} />
                                <Input name="email" label="E-mail" rules="required|email" placeholder="enter your email..." disabled={request.loading} />
                                <Input name="password" label="Password" rules="required|strong_password|min:8" placeholder="enter your password..." type="password" disabled={request.loading} />
                                <Input name="confirm" label="Confirm Password" rules="required|same:password@Password" placeholder="confrim your password..." type="password" disabled={request.loading} />
                                <Button block variant={Variant.Secondary} type="submit" className="mt-5" loading={request.loading}>SUBMIT</Button>
                            </FormProvider>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default Register
