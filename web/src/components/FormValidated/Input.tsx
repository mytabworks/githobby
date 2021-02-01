import React, { FunctionComponent, ReactNode, memo } from 'react'
import { useFormField } from 'formydable'
import RawInput from './InputCore'

interface InputProps {
    label: string;
    value?: any;
    rules: string;
    name: string;
    id?: string;
    icon?: string | ReactNode;
    disabled?: boolean;
    inline?: boolean;
    prepend?: boolean;
    [rest: string]: any;
}

const Input: FunctionComponent<InputProps> = (props) => {

    const { label, value, rules, name }  = props
    
    const { formState, formUpdate, formRegistry } = useFormField()

    const state = formState(name)

    formRegistry({
        label,
        value,
        rules,
        name
    })

    return (
        <RawInput {...props} state={state} onChange={formUpdate} />
    )
}

export default memo(Input);
