import React from 'react'
import Container from '@components/Layout/Container'
import Nav from '@components/Nav'
import icon from '@images/icon.png'
import { Link } from 'react-router-dom'
import './index.scss'
interface NavbarProps {
    
}

const Navbar: React.FunctionComponent<NavbarProps> = (props) => {
    return (
        <div className="navbar fixed-top">
            <Container>
                <Link to="/" className="brand"><img src={icon} alt="githobby" /> <span>GitHobby</span></Link>
                <Nav className="ml-auto">
                    <Nav.Link to="/register" >Register</Nav.Link>
                    <Nav.Link to="/login" >Login</Nav.Link>
                </Nav>
            </Container>
        </div>
    )
}

export default Navbar;