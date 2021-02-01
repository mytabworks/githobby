import React from 'react'
import classNames from '@utils/classNames'
import { ComponentProps } from '../types'

const CardHeader: React.FunctionComponent<ComponentProps> = ({className, children}) => {
    return (
        <div className={classNames("card-header", {}, className)}>
            {children}
        </div>
    )
}

export default CardHeader
