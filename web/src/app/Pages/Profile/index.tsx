import React, { Suspense, useEffect } from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import Row from '@components/Layout/Row'
import Col from '@components/Layout/Col'
import Nav from '@components/Nav'
import Text from '@components/Text'
import Icon from '@components/Icon'
import Alert from '@components/Alert'
import { useSession } from '@components/Session'
import { Variant } from '@components/types'
import { useGithub } from '@utils/hooks/useGithub'
import Facade from '@images/facade'
import Loader from '@app/Loader'
import { Settings, Other, Activities } from './Tabs'
import Fallback from './Tabs/Fallback'

const Profile: React.FunctionComponent = () => {
    const match = useRouteMatch()
    const [{user}] = useSession()
    const {value: githubProfile, ...requestGitProfile} = useGithub(`/users/${user?.name}`)
    const requestGitRepo = useGithub(`/users/${user?.name}/repos`)
    const requestGitStarred = useGithub(`/users/${user?.name}/starred`)
    const requestGitFollower = useGithub(`/users/${user?.name}/followers`)
    const requestGitFollowing = useGithub(`/users/${user?.name}/following`)
    const stars = requestGitRepo.value?.reduce((result: number, item: any) => {
        return result + parseInt(item.stargazers_count)
    }, 0) || 0
    useEffect(() => {
        requestGitProfile.call().then(() => {
            requestGitRepo.call()
            requestGitStarred.call()
            requestGitFollower.call()
            requestGitFollowing.call()
        })
    }, [])
    
    return (
        <div className="pt-5">
            <Alert in={!!requestGitProfile.error} variant={Variant.Danger}>
                {requestGitProfile.error?.includes("404") ? (
                    "Your github username doesn't exist."
                ) : (
                    requestGitProfile.error
                )}
            </Alert>
            <Row>
                <Col sm={4}>
                    <img width="100%" src={githubProfile?.avatar_url || Facade} />
                    <Text as="h1" align="center" variant={Variant.Primary}>{githubProfile?.name}</Text>
                    <Text as="h3" align="center" variant={Variant.Success}>{githubProfile?.login}</Text>
                    <Text as="p" align="center">{githubProfile?.bio}</Text>
                    <Text as="p" align="center">
                        <Icon name="user"/>followers <Text as="b">{githubProfile?.followers}</Text> ·
                        following <Text as="b">{githubProfile?.followers}</Text> ·
                        <Icon name="star-full"/><Text as="b">{stars}</Text>
                    </Text>
                    <Nav tabs column>
                        <Nav.Link exact to={`${match.url}`} className="t-center">
                            Activities
                        </Nav.Link>
                        <Nav.Link to={`${match.url}/settings`} className="t-center">
                            Settings
                        </Nav.Link>
                    </Nav>
                </Col>
                <Col sm={8}>
                    <Nav tabs>
                        <Nav.Link to={`${match.url}/repositories`}>
                            Repositories {requestGitRepo.value?.length}
                        </Nav.Link>
                        <Nav.Link to={`${match.url}/starred`}>
                            Starred {requestGitStarred.value?.length}
                        </Nav.Link>
                        <Nav.Link to={`${match.url}/followers`}>
                            Followers {requestGitFollower.value?.length}
                        </Nav.Link>
                        <Nav.Link to={`${match.url}/following`}>
                            Following {requestGitFollowing.value?.length}
                        </Nav.Link>
                    </Nav>
                    <div className="p-relative">
                        <Suspense fallback={<Loader/>}>
                            <Switch>
                                <Route exact path={`${match.url}`}>
                                    <Activities />
                                    </Route>
                                <Route path={`${match.url}/repositories`}>
                                    <Other 
                                        title="Repositories" 
                                        request={requestGitRepo}
                                        fallback={(
                                            <Fallback 
                                                icon="book" 
                                                message="You don't have any repositories."
                                                />
                                        )}/>
                                </Route>
                                <Route path={`${match.url}/starred`}>
                                    <Other 
                                        title="Starred" 
                                        request={requestGitStarred} 
                                        fallback={(
                                            <Fallback 
                                                icon="star-empty" 
                                                message="You aren't starred any repository."
                                                />
                                        )}/>
                                </Route>
                                <Route path={`${match.url}/followers`}>
                                    <Other 
                                        title="Followers"
                                        request={requestGitFollower} 
                                        fallback={(
                                            <Fallback 
                                                icon="friends" 
                                                message="No one is following you."
                                                />
                                        )}/>
                                </Route>
                                <Route path={`${match.url}/following`}>
                                    <Other 
                                        title="Following" 
                                        request={requestGitFollowing} 
                                        fallback={(
                                            <Fallback 
                                                icon="friends" 
                                                message="You aren’t following anybody."
                                                />
                                        )}/>
                                </Route>
                                <Route path={`${match.url}/settings`}>
                                    <Settings />
                                </Route>
                            </Switch>
                        </Suspense>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default Profile
