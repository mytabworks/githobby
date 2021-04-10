import classNames from '@utils/classNames'
import React from 'react'
import Target from './Target'
import Accordion from './Accordion'
import { AliasMemoWithChain, AliasProps } from '../types'
import './index.scss'

interface CollapseProps extends AliasProps {
    eventKey: string;
    accordionKey?: string;
    transition?: 'fast' | 'faster' | 'slow' | 'slower'
}

interface CollpaseChain {
    Target: typeof Target;
    Accordion: typeof Accordion;
}

const Collapse = AliasMemoWithChain<'div', CollapseProps, CollpaseChain>(({ as: Component = 'div', eventKey, accordionKey, transition, children, className, ...props}) => {

    return (
        <Component className={classNames("collapse", {}, transition && `collapse-${transition}`, className)} {...props} data-collapsible={eventKey} data-accordion={accordionKey ? `#${accordionKey}` : undefined}>
            {children}
        </Component>
    )
})

Collapse.Target = Target
Collapse.Accordion = Accordion

export default Collapse
