import React from 'react'
import { AliasFunction, AliasProps } from '../types'

interface AccordionProps extends AliasProps {
    accordionKey: string;
}

const Accordion: AliasFunction<'div', AccordionProps> = React.memo(({as: Component = 'div', accordionKey, children, ...props}) => {
    return (
        <Component data-collapse-container={accordionKey} {...props}>
            {children}
        </Component>
    )
})

export default Accordion
