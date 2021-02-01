import React from 'react'
import { FormEventType, FormProvider } from 'formydable'
import Row from '@components/Layout/Row'
import Col from '@components/Layout/Col'
import Input from '@components/FormValidated/Input'
import Button from '@components/Button'
import Card from '@components/Card'
import { Variant } from '@components/types'

interface LoginProps {
    
}

const Login: React.FunctionComponent<LoginProps> = () => {

    const handleSubmit = (event: FormEventType) => {

    }

    return (
        <div className="pt-5">
            <Row>
                <Col sm={{ offset: 1, span: 10}} md={{ offset: 4, span: 6}}>
                    <Card className="mt-4" variant={Variant.Primary}>
                        <Card.Header>
                            <h3>login</h3>
                        </Card.Header>
                        <Card.Body className="p-5">
                            <FormProvider onSubmit={handleSubmit}>
                                <Input name="email" label="E-mail" rules="required|email" placeholder="enter your email..."  />
                                <Input name="password" label="Password" rules="required" placeholder="enter your password..." type="password"  />
                                <Button block variant={Variant.Secondary} type="submit">SUBMIT</Button>
                            </FormProvider>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default Login
