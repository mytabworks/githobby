import React, { FunctionComponent } from 'react'
import { ComponentProps } from '../types'
import Link from './Link'
import './index.scss'
import classNames from '@utils/classNames'

interface NavProps extends ComponentProps {
    column?: boolean;
    tabs?: boolean;
}

interface NavComponent<P> extends FunctionComponent<P> {
    Link: typeof Link;
}

const Nav: NavComponent<NavProps> = ({ column, tabs, className, children, ...props }) => {
    return (
        <nav className={classNames('nav', { 'nav-column': column, 'nav-tabs': tabs }, className)} {...props}>
            {children}
        </nav>
    )
}

Nav.Link = Link

export default Nav
