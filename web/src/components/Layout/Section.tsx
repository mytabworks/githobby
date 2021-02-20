import React, { FunctionComponent, memo } from 'react';
import { ComponentProps } from '../types';

export interface SectionProps extends ComponentProps {
    id?: string;
}

const Section: FunctionComponent<SectionProps> = ({id, className, children}) => {
    
    return (
        <section id={id} className={`section${className ? ` ${className}` : ''}`}>
            {children}
        </section>
    )
}

export default memo(Section)
