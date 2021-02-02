import React, { FunctionComponent, memo } from 'react'
import { AliasComponentProps, Variant } from '../types'
import Spinner from '../Spinner'
import classNames from '@utils/classNames'
import './index.scss'


interface ButtonProps extends AliasComponentProps {
    variant?: Variant;
    size?: 'xs' | 'sm' | 'lg';
    outline?: boolean;
    block?: boolean;
    loading?: boolean;
}

const Button: FunctionComponent<ButtonProps> = ({ as: Component, className, children, variant, size, outline, block, loading, ...rest}) => {
    return (
        <Component 
          className={classNames('btn', {
            'btn-outline': outline,
            'btn-block': block,
            loading
            },  
            variant && `btn-${variant}`, 
            size && `btn-${size}`,
            className
          )}  
          type='button'
          disabled={loading}
          {...rest}>
            {loading && <Spinner/>} 
            {children}
        </Component>
    )
}

Button.defaultProps = {
    as: 'button',
    loading: false
}

export default memo(Button)
