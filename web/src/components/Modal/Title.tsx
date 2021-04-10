import React, { memo } from 'react'
import { AliasFunction, AliasProps } from '../types'

const Title: AliasFunction<'h4', AliasProps> = memo(({ as: Component = 'h4', children, className, ...props }) => {
    return (
        <Component className={`modal-title${className ? ` ${className}` : ''}`} {...props}>
            {children}
        </Component>
    )
})

export default Title
