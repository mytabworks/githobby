import React from 'react'
import { FormEventType, FormProvider } from 'formydable'
import Row from '@components/Layout/Row'
import Col from '@components/Layout/Col'
import Input from '@components/FormValidated/Input'
import Button from '@components/Button'
import Card from '@components/Card'
import { Variant } from '@components/types'

interface RegisterProps {
    
}

const Register: React.FunctionComponent<RegisterProps> = () => {

    const handleSubmit = (event: FormEventType) => {

    }

    return (
        <div className="pt-5">
            <Row>
                <Col sm={{ offset: 1, span: 10}} md={{ offset: 3, span: 6}}>
                    <Card className="mt-4" variant={Variant.Primary}>
                        <Card.Header>
                            <h3 className="mb-0">registration</h3>
                        </Card.Header>
                        <Card.Body className="p-5">
                            <FormProvider onSubmit={handleSubmit}>
                                <Input name="username" label="Username" rules="required" placeholder="enter your github username..."  />
                                <Input name="email" label="E-mail" rules="required|email" placeholder="enter your email..."  />
                                <Input name="password" label="Password" rules="required|strong_password|min:8" placeholder="enter your password..." type="password"  />
                                <Input name="confirm" label="Confirm Password" rules="required|same:password@Password" placeholder="confrim your password..." type="password"  />
                                <Button block variant={Variant.Secondary} type="submit" className="mt-5">SUBMIT</Button>
                            </FormProvider>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default Register
