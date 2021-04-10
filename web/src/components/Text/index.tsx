import React from 'react'
import classNames from '@utils/classNames'
import { Variant, AliasProps, AliasFunction } from '../types'
import './index.scss'

interface TextProps extends AliasProps {
    variant?: Variant;
    align?: 'center' | 'start' | 'end'
}

const Text: AliasFunction<'span', TextProps> = ({ as: Component = 'span', className, variant, align, children}) => {
    return (
        <Component className={classNames('text', {}, variant && `text-${variant}`, align && `text-${align}`, className)}>
            {children}
        </Component>
    )
}

export default Text
