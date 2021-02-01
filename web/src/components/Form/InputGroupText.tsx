import React, { FunctionComponent, memo } from 'react'
import { ComponentProps } from '../types'
import classNames from '../../utils/classNames'

const InputGroupAppend: FunctionComponent<ComponentProps> = memo(({className, children, ...props}) => {
    return (
        <span 
            className={classNames('input-group-text', {}, className)} 
            {...props}
            >
            {children}
        </span>
    )
})

export default InputGroupAppend
