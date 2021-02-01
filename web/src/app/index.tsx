import React, { FunctionComponent } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Container from '@components/Layout/Container'
import Navbar from './Navbar'
import Footer from './Footer'

export const App: FunctionComponent = () => {

    return (
        <BrowserRouter>
            <Navbar />
            <Container className="main">
                <Switch>
                    <Route exact path="/">home</Route>
                    <Route path="/login">login</Route>
                    <Route path="/register">register</Route>
                </Switch>
            </Container>
            <Footer />
        </BrowserRouter>
    )
}
