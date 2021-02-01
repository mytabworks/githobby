import React, { FunctionComponent, memo } from 'react'
import { AliasComponentProps, Variant } from '../types'
import classNames from '@utils/classNames'
import './index.scss'

interface ButtonProps extends AliasComponentProps {
    variant?: Variant;
    size?: 'xs' | 'sm' | 'lg';
    outline?: boolean;
    block?: boolean;
}

const Button: FunctionComponent<ButtonProps> = ({ as: Component, className, children, variant, size, outline, block, ...rest}) => {
    return (
        <Component 
          className={classNames('btn', {
            'btn-outline': outline,
            'btn-block': block,
            },  
            variant && `btn-${variant}`, 
            size && `btn-${size}`,
            className
          )}  
          type='button'
          {...rest}>
            {children}
        </Component>
    )
}

Button.defaultProps = {
    as: 'button'
}

export default memo(Button)
