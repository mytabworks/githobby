import React from 'react'
import classNames from '@utils/classNames'
import { Variant, ComponentProps } from '../types'
import Header from './Header'
import Body from './Body'
import './index.scss'

interface CardProps extends ComponentProps {
    variant?: Variant;
}

interface CardComponent<P> extends React.FunctionComponent<P> {
    Header: typeof Header;
    Body: typeof Body;
}

const Card: CardComponent<CardProps> = ({variant, className, children}) => {
    return (
        <div className={classNames("card", {}, variant && `card-${variant}`, className)}>
            {children}
        </div>
    )
}

Card.Header = Header
Card.Body = Body

export default Card
