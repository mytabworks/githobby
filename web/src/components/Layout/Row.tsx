import React, { FunctionComponent, memo } from 'react';
import { ComponentProps } from '../types';

export type RowProps = ComponentProps

const Row: FunctionComponent<RowProps> = ({className, children}) => {
    
    return (
        <div className={`row${className ? ` ${className}` : ''}`}>
            {children}
        </div>
    )
}

export default memo(Row)
