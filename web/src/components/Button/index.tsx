import React, { FunctionComponent, memo } from 'react'
import { AliasFunction, AliasProps, Variant } from '../types'
import Spinner from '../Spinner'
import classNames from '@utils/classNames'
import './index.scss'


interface ButtonProps extends AliasProps {
    variant?: Variant;
    size?: 'xs' | 'sm' | 'lg';
    outline?: boolean;
    block?: boolean;
    loading?: boolean;
}

const Button: AliasFunction<'button', ButtonProps> = ({ as: Component = 'button', className, children, variant, size, outline, block, loading, ...rest}) => {
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
    loading: false
}

export default memo(Button)
