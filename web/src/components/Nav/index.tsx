import React, { FunctionComponent } from 'react'
import { ComponentProps } from '../types'
import Link from './Link'
import './index.scss'

interface NavComponent<P> extends FunctionComponent<P> {
    Link: typeof Link;
}

const Nav: NavComponent<ComponentProps> = ({ className, children, ...props }) => {
    return (
        <nav className={`nav${ className ? ` ${className}` : ''}`} {...props}>
            {children}
        </nav>
    )
}

Nav.Link = Link

export default Nav
