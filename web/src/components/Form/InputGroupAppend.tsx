import React, { FunctionComponent } from 'react'
import { ComponentProps } from '../types'
import classNames from '../../utils/classNames'

const InputGroupAppend: FunctionComponent<ComponentProps> = ({className, children, ...props}) => {
    return (
        <div 
            className={classNames('input-group-append', {}, className)} 
            {...props}
            >
            {children}
        </div>
    )
}

export default InputGroupAppend
