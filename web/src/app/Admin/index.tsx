import React, { Suspense } from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { useSession } from '@components/Session'
import Container from '@components/Layout/Container'
import Row from '@components/Layout/Row'
import Col from '@components/Layout/Col'
import Loader from '@app/Loader'
import Navbar from '@app/Navbar'
import Sidebar from './Sidebar'
import { Login, Dashboard, Users } from './Pages'

const Admin: React.FunctionComponent = (props) => {
    const [{user}] = useSession()
    const {path} = useRouteMatch()
    return (
        <Suspense fallback={<Loader/>}>
            {user ? (
                <>
                    <Navbar brand="Admin" brandUrl="/admin" filled/>
                    <Container className="main" filled>
                        <Row className="pt-3">
                            <Col sm={4} md={3} lg={3} xl={1}>
                                <Sidebar/>
                            </Col>
                            <Col sm={8} md={9} lg={9} xl={10}>
                            <Switch>
                                <Route exact path={`${path}`} component={Dashboard}/>
                                <Route exact path={`${path}/users`} component={Users}/>
                            </Switch>
                            </Col>
                        </Row>
                    </Container>
                </>
            ) : (
                <Route exact path={`${path}`} component={Login}/>
            )}
        </Suspense>
    )
}

export default Admin
