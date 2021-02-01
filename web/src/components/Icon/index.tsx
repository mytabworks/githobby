import React, { FunctionComponent, memo } from 'react'
import classNames from '../../utils/classNames'
import './font/my-icon.css'

interface IconProps {
    name: string;
    className?: string;
}

const Icon: FunctionComponent<IconProps> = ({ name, className }) => {
    return (
        <i className={classNames(`my my-${name}`, {}, className)} />
    )
}

export default memo(Icon)
