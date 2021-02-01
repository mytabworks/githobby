import React, { FunctionComponent, memo } from 'react'
import { ComponentProps } from '../types'

interface LabelProps extends ComponentProps {
    htmlFor?: string;
}

const Label: FunctionComponent<LabelProps> = memo(({children, ...props}) => {
    return (
        <label  
            {...props}
            >
            {children}
        </label>
    )
})

export default Label
