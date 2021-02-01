import React from 'react'
import classNames from '@utils/classNames'
import { ComponentProps } from '../types'

const CardBody: React.FunctionComponent<ComponentProps> = ({className, children}) => {
    return (
        <div className={classNames("card-body", {}, className)}>
            {children}
        </div>
    )
}

export default CardBody
