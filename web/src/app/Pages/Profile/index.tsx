import React, { useEffect } from 'react'
import { FormEventType, FormProvider } from 'formydable'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import Row from '@components/Layout/Row'
import Col from '@components/Layout/Col'
import Input from '@components/FormValidated/Input'
import Button from '@components/Button'
import Card from '@components/Card'
import Alert from '@components/Alert'
import { SessionActionType, useSession } from '@components/Session'
import { Variant } from '@components/types'
import { useGithub } from '@utils/hooks/useGithub'
import Nav from '@components/Nav'
import Text from '@components/Text'
import Icon from '@components/Icon'

const Profile: React.FunctionComponent = () => {
    const match = useRouteMatch()
    const [{user}] = useSession()
    const {value: githubProfile, ...requestGitProfile} = useGithub(`/users/mytabworks`)

    useEffect(() => {
        requestGitProfile.call()
    }, [])
    
    return (
        <div className="pt-5">
            <Row>
                <Col sm={4}>
                    <img width="100%" src={githubProfile?.avatar_url} />
                    <Text as="h1" align="center" variant={Variant.Primary}>{githubProfile?.name}</Text>
                    <Text as="h3" align="center" variant={Variant.Success}>{githubProfile?.login}</Text>
                    <Text as="p" align="center">{githubProfile?.bio}</Text>
                    <Text as="p" align="center">
                        <Icon name="user"/>followers <Text as="b">{githubProfile?.followers}</Text> ·
                        following <Text as="b">{githubProfile?.followers}</Text> ·
                        <Icon name="star-full"/><Text as="b">{githubProfile?.star || 0}</Text>
                    </Text>
                    <Nav tabs column>
                        <Nav.Link to={`${match.url}/settings`} className="t-center">
                            Settings
                        </Nav.Link>
                    </Nav>
                </Col>
                <Col sm={8}>
                    <Nav tabs>
                        <Nav.Link to={`${match.url}/repositories`}>
                            Repositories
                        </Nav.Link>
                        <Nav.Link to={`${match.url}/projects`}>
                            Projects
                        </Nav.Link>
                        <Nav.Link to={`${match.url}/packages`}>
                            Packages
                        </Nav.Link>
                    </Nav>
                    <Switch>
                        <Route path={`${match.url}/repositories`}>repositories</Route>
                        <Route path={`${match.url}/projects`}>projects</Route>
                        <Route path={`${match.url}/packages`}>packages</Route>
                        <Route path={`${match.url}/settings`}>settings</Route>
                    </Switch>
                </Col>
            </Row>
        </div>
    )
}

export default Profile
