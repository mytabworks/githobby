import React, { useEffect } from 'react'
import Card from '@components/Card'
import Icon from '@components/Icon'
import Col from '@components/Layout/Col'
import Row from '@components/Layout/Row'
import Text from '@components/Text'
import HeadGear from '@components/HeadGear'
import { useAuthRequest } from '@utils/hooks/useAuthRequest'
import Loader from '@app/Loader'

const Dashboard: React.FunctionComponent = () => {
    const request = useAuthRequest('/users')
    useEffect(() => {
        request.call({
            params: {
                filters: "[]"
            }
        })
    }, [])
    return (
        <Row>
            <HeadGear
                title="Githobby | Admin - Dashboard"
                description=""
                />
            <Col sm={6}>
                <Card>
                    <Card.Header>
                        Users
                    </Card.Header>
                    <Card.Body>
                        <Text as="h2" align="center" className="t-size-50 my-3">
                            <Icon name="friends"/>
                        </Text>
                        <Text as="p" align="center" className="t-size-50">
                            {request.value?.totalCount || 0}
                        </Text>
                        {request.loading && <Loader/>}
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
