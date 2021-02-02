import React from 'react'
import Row from '@components/Layout/Row'
import Col from '@components/Layout/Col'
import Alert from '@components/Alert'

const Profile: React.FunctionComponent = () => {
   
    const [show, setShow] = React.useState<boolean>(true)
    
    return (
        <div className="pt-5">
            <Row>
                <Col sm={{ offset: 1, span: 10}} lg={{ offset: 3, span: 6}}>
                    <Alert in={show} dismisible onHide={() => setShow(false)}>
                        Boy nana
                    </Alert>
                </Col>
            </Row>
        </div>
    )
}

export default Profile
