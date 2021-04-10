import React, { memo } from 'react'
import Link from './Link'
import './index.scss'
import classNames from '@utils/classNames'
import { MemoFunction } from '@components/types'

interface NavProps extends React.HTMLProps<HTMLElement> {
    column?: boolean;
    tabs?: boolean;
}

interface NavComponent<P> extends MemoFunction<P> {
    Link?: typeof Link;
}

const Nav: NavComponent<NavProps> = memo(({ column, tabs, className, children, ...props }) => {
    return (
        <nav className={classNames('nav', { 'nav-column': column, 'nav-tabs': tabs }, className)} {...props}>
            {children}
        </nav>
    )
})

Nav.Link = Link

export default Nav
