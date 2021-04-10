import React, { memo } from 'react'
import { AliasFunction, AliasProps } from '../types'
import { NavLink } from 'react-router-dom'

export interface LinkProps extends AliasProps {
    to: string;
}

const Link: AliasFunction<typeof NavLink, LinkProps> = ({as: Component = NavLink, className, children, ...props}) => {
  
    return (
        <Component className={`nav-link${className ? ` ${className}` : ''}`} {...props}>
            {children}
        </Component>
    )
}

export default memo(Link)
