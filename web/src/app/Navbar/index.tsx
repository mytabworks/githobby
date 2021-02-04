import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { AxiosResponse } from 'axios'
import Container from '@components/Layout/Container'
import Nav from '@components/Nav'
import Spinner from '@components/Spinner'
import { SessionActionType, UserRole, useSession } from '@components/Session'
import { useAuthRequest } from '@utils/hooks/useAuthRequest'
import icon from '@images/icon.png'
import './index.scss'

interface NavbarProps {
    brand: string;
    brandUrl: string;
    filled?: boolean;
}

const Navbar: React.FunctionComponent<NavbarProps> = ({ brand, brandUrl, filled}) => {
    const [{loading, user}, dispatch] = useSession()
    const history = useHistory()
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
                history.push(user?.roles.includes(UserRole.ADMIN) ? '/admin' : '/')
            }
        })
    }
    return (
        <div className="navbar fixed-top">
            <Container filled={filled}>
                <Link to={brandUrl} className="brand"><img src={icon} alt="githobby" /> <span>{brand}</span></Link>
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