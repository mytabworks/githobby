import React from 'react'
import Container from '@components/Layout/Container'
import Nav from '@components/Nav'
import Spinner from '@components/Spinner'
import { SessionActionType, useSession } from '@components/Session'
import { Link } from 'react-router-dom'
import { useAuthRequest } from '@utils/hooks/useAuthRequest'
import icon from '@images/icon.png'
import './index.scss'
import { AxiosResponse } from 'axios'

const Navbar: React.FunctionComponent = () => {
    const [{loading, user}, dispatch] = useSession()
    const requestLogout = useAuthRequest('/revoke_token', {
        method: 'POST'
    })
    const handleLogout = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault()
        requestLogout.call().then((response: AxiosResponse) => {
            if(response.data.status === 'ok') {
                dispatch({
                    type: SessionActionType.SET_TOKEN,
                    payload: ""
                })
            }
        })
    }
    return (
        <div className="navbar fixed-top">
            <Container>
                <Link to="/" className="brand"><img src={icon} alt="githobby" /> <span>GitHobby</span></Link>
                <Nav className="ml-auto">
                    {loading ? (
                        <Spinner/>
                    ) : (
                        !user ? (
                            <>
                                <Nav.Link to="/register" >Register</Nav.Link>
                                <Nav.Link to="/login" >Login</Nav.Link>
                            </>
                        ): (
                            <>
                                <Nav.Link to="/profile" >{user.name}</Nav.Link>
                                <Nav.Link to="/logout" as="a" href="/logout" onClick={handleLogout}>logout</Nav.Link>
                            </>
                        )
                    )}
                </Nav>
            </Container>
        </div>
    )
}

export default Navbar;