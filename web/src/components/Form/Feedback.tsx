import React, { FunctionComponent, memo } from 'react'
import { ComponentProps } from '../types'
import classNames from '../../utils/classNames'

interface FeedbackProps extends ComponentProps {
    type: 'valid' | 'invalid'
}

const Feedback: FunctionComponent<FeedbackProps> = memo(({type, className, children, ...props}) => {
    return (
        <div 
            className={classNames(`${type}-feedback`, {}, className)} 
            {...props}
            >
            {children}
        </div>
    )
})

export default Feedback
