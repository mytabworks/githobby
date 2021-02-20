import React, { FunctionComponent } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { UserRole, useSession } from '@components/Session'
import Container from '@components/Layout/Container'
import ConditionalRoute from '@components/ConditinalRoute'
import { useRecieveUser } from '@utils/hooks/useRecieveUser'
import { useRefreshToken } from '@utils/hooks/useRecieveToken'
import Navbar from './Navbar'
import Footer from './Footer'
import Loader from './Loader'
import Admin from './Admin'
import {Landing, Login, NotFound, Profile, Registration } from './Pages'

export const App: FunctionComponent = () => {
    const [{user, loading}] = useSession()
    useRefreshToken()
    useRecieveUser()
    return (
        <BrowserRouter>
            {loading ? (
                <Loader />
            ) : (
                <Switch>
                    <ConditionalRoute path="/admin" condition={!user || (!!user && user.roles.includes(UserRole.ADMIN))} redirectTo="/">
                        <Admin />
                    </ConditionalRoute>
                    <ConditionalRoute path="/" condition={!user || (!!user && user.roles.includes(UserRole.CLIENT))} redirectTo="/admin">
                        <Navbar brand="Githobby" brandUrl="/" />
                        <Container className="main">
                            <React.Suspense fallback={<Loader />}>
                                <Switch>
                                    <Route exact path="/" component={Landing}/>
                                    <ConditionalRoute condition={!user} redirectTo="/" path="/login">
                                        <Login/>
                                    </ConditionalRoute>
                                    <ConditionalRoute condition={!user} redirectTo="/" path="/register">
                                        <Registration/>
                                    </ConditionalRoute>
                                    <ConditionalRoute condition={!!user && user.roles.includes(UserRole.CLIENT)} redirectTo="/login" path="/profile">
                                        <Profile/>
                                    </ConditionalRoute>
                                    <Route path="*" component={NotFound}/>
                                </Switch>
                            </React.Suspense>
                        </Container>
                        <Footer />
                    </ConditionalRoute>
                </Switch>
            )}
        </BrowserRouter>
    )
}
