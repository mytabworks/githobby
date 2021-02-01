import React, { FunctionComponent } from 'react'
import { ComponentProps } from '../types'
import classNames from '../../utils/classNames'

const InputGroupPrepend: FunctionComponent<ComponentProps> = ({className, children, ...props}) => {
    return (
        <div 
            className={classNames('input-group-prepend', {}, className)} 
            {...props}
            >
            {children}
        </div>
    )
}

export default InputGroupPrepend
