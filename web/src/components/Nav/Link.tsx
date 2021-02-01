import React, { FunctionComponent, memo } from 'react'
import { AliasComponentProps } from '../types'
import { NavLink } from 'react-router-dom'
export interface LinkProps extends AliasComponentProps {
    to: string;
}

const Link: FunctionComponent<LinkProps> = ({as: Component, className, children, ...props}) => {
  
    return (
        <NavLink className={`nav-link${className ? ` ${className}` : ''}`} {...props}>
            {children}
        </NavLink>
    )
}

Link.defaultProps = {
    as: 'a'
}

export default memo(Link)
