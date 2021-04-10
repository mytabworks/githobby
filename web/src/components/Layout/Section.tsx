import React, { FunctionComponent, memo } from 'react';

export interface SectionProps extends React.HTMLProps<HTMLElement> {
    id?: string;
}

const Section: FunctionComponent<SectionProps> = ({id, className, children, ...props}) => {
    
    return (
        <section id={id} className={`section${className ? ` ${className}` : ''}`} {...props}>
            {children}
        </section>
    )
}

export default memo(Section)
