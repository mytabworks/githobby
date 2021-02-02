import React, { FunctionComponent } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Container from '@components/Layout/Container'
import Navbar from './Navbar'
import Footer from './Footer'
import Loader from './Loader'
import { Landing, Login, Registration } from './Pages'

export const App: FunctionComponent = () => {

    return (
        <BrowserRouter>
            <Navbar />
            <Container className="main">
                <React.Suspense fallback={<Loader />}>
                    <Switch>
                        <Route exact path="/" component={Landing}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/register" component={Registration}/>
                    </Switch>
                </React.Suspense>
            </Container>
            <Footer />
        </BrowserRouter>
    )
}
