import { ElementType, ReactNode } from 'react'

export enum Variant {
    Success = 'success',
    Danger = 'danger',
    Warning = 'warning',
    Info = 'info'
}

export interface ComponentProps {  
    className?: string;
    children?: ReactNode;
    [rest: string]: any;
}

export interface AliasComponentProps<AS extends ElementType = any> extends ComponentProps{  
    as?: AS; 
}