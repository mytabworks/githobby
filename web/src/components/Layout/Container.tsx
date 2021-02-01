import React, { FunctionComponent, ReactNode, memo } from 'react';

export interface ContainerProps {
    className?: string;
    filled?: boolean;
    children: ReactNode;
}

const Container: FunctionComponent<ContainerProps> = ({className, filled, children}) => {
    return (
        <div className={`container${filled ? '-filled' : ''}${className ? ` ${className}`: ''}`}>
            {children}
        </div>
    )
}

export default memo(Container)
