import React, { FunctionComponent, ReactNode, memo } from 'react';

export interface ContainerProps extends React.HTMLProps<HTMLDivElement> {
    filled?: boolean;
}

const Container: FunctionComponent<ContainerProps> = ({className, filled, children, ...props}) => {
    return (
        <div className={`container${filled ? '-filled' : ''}${className ? ` ${className}`: ''}`} {...props}>
            {children}
        </div>
    )
}

export default memo(Container)
