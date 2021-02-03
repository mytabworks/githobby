import React from 'react'
import classNames from '@utils/classNames'
import { Variant, AliasComponentProps } from '../types'
import './index.scss'

interface TextProps extends AliasComponentProps {
    variant?: Variant;
    align?: 'center' | 'start' | 'end'
}

const Text: React.FunctionComponent<TextProps> = ({ as: Component, className, variant, align, children}) => {
    return (
        <Component className={classNames('text', {}, variant && `text-${variant}`, align && `text-${align}`, className)}>
            {children}
        </Component>
    )
}

Text.defaultProps = {
    as: 'span'
}

export default Text
