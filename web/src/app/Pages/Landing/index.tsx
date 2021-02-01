import React from 'react'
import Row from '@components/Layout/Row'
import Col from '@components/Layout/Col'
import Form from '@components/Form'
import Button from '@components/Button'
import Card from '@components/Card'
import { Variant } from '@components/types'

interface LandingProps {
    
}

const Landing: React.FunctionComponent<LandingProps> = (props) => {
    return (
        <div className="pt-5">
            <Form>
                <Form.InputGroup>
                    <Form.Control placeholder="search repository"/>
                    <Form.InputGroup.Append>
                        <Button className="px-5" variant={Variant.Secondary}>SUBMIT</Button>
                    </Form.InputGroup.Append>
                </Form.InputGroup>
            </Form>
            <Card className="mt-4" variant={Variant.Primary}>
                <Card.Header>
                    <h3>repository</h3>
                </Card.Header>
                <Card.Body>
                    sample body
                </Card.Body>
            </Card>
        </div>
    )
}

export default Landing
