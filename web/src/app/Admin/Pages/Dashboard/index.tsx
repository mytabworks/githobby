import React from 'react'
import Card from '@components/Card'
import Icon from '@components/Icon'
import Col from '@components/Layout/Col'
import Row from '@components/Layout/Row'
import Text from '@components/Text'

const Dashboard: React.FunctionComponent = () => {
    return (
        <Row>
            <Col sm={6}>
                <Card>
                    <Card.Header>
                        Users
                    </Card.Header>
                    <Card.Body>
                        <Text as="h2" align="center" className="t-size-50 my-3">
                            <Icon name="friends"/>
                        </Text>
                        <Text as="p" align="center" className="t-size-50">10</Text>
                    </Card.Body>
                </Card>
            </Col>
            <Col sm={6}>
                <Card>
                    <Card.Header>
                        Active Users
                    </Card.Header>
                    <Card.Body>
                        <Text as="h2" align="center" className="t-size-50 my-3">
                            <Icon name="friends"/>
                        </Text>
                        <Text as="p" align="center" className="t-size-50">1</Text>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}

export default Dashboard
