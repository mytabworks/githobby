import React, { FunctionComponent, memo } from 'react';

const Row: FunctionComponent<React.HTMLProps<HTMLDivElement>> = ({className, children, ...props}) => {
    
    return (
        <div className={`row${className ? ` ${className}` : ''}`} {...props}>
            {children}
        </div>
    )
}

export default memo(Row)
