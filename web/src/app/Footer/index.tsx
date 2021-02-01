import React from 'react'
import Container from '@components/Layout/Container'
import './index.scss'

interface FooterProps {
    
}

const Footer: React.FunctionComponent<FooterProps> = (props) => {
    return (
        <footer className="footer">
            <Container>
                © {new Date().getFullYear()} Mytabworks. All rights reserved.
            </Container>
        </footer>
    )
}

export default Footer
