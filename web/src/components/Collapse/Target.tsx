import React, { useEffect, useRef } from 'react'
import { Collapsible } from './utils'
import { AliasFunction, AliasProps } from '../types'

const Fragment = React.Fragment as any

interface TargetProps extends AliasProps {
    eventKey: string;
}

const Target: AliasFunction<'button', TargetProps> = ({as: Component = 'button', eventKey, children, ...props}) => {
    
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const cleanup = new (Collapsible as any)(ref.current)

        return () => cleanup.destroy()
    }, [])
    
    return (
        <Component ref={ref} {...props} data-collapse={eventKey}>
            {children}
        </Component>
    )
}

export default Target
