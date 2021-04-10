import { useState, useRef, useEffect, useContext, createContext } from 'react'

type StaticProps = {
    [name: string]: any;
}

export type CustomFieldStates = {
    value: any;
    dirty: boolean;
    staticProps?: StaticProps;
}

export type CustomFieldEvent = { 
    name: string, 
    value: any, 
    target: { 
        name: string, 
        value: any
    }
}

export type CustomFieldOnChange = (event: CustomFieldEvent) => void;

export type CustomFieldProps = {
    name: string;
    value: any;
    onChange?: CustomFieldOnChange;
    staticProps?: StaticProps;
}

export const useCustomField = ({
    name,
    value,
    onChange,
    staticProps = {}
}: CustomFieldProps) => {
    const selectStates = useState<CustomFieldStates>({
        value,
        dirty: false,
        staticProps
    })

    const [states, setStates] = selectStates

    const mounted = useRef(false)

    useEffect(() => {
        if(mounted.current && states.dirty && onChange) {

            const target = { name, value: states.value }

            onChange({...target, target})
        }
    }, [states.value])

    useEffect(() => {
        if(mounted.current) {
            if(!value && states.dirty) {
                /* reset value */
                setStates(prev => ({...prev, value, dirty: false }))
            } else if(states.value !== value) {
                /* changes value from props */
                setStates(prev => ({...prev, value }))
            }
        }
    }, [value])

    useEffect(() => {
        mounted.current = true
    }, [])

    return selectStates
}

export const CustomFieldContext = createContext<[CustomFieldStates, React.Dispatch<React.SetStateAction<CustomFieldStates>>]>(null as any)

export const useCustomFieldContext = () => useContext(CustomFieldContext)

type UseCustomFieldOption = {
    value?: any;
    onClick?: (event: React.MouseEvent<any>) => void;
}

export const useCustomFieldOption = ({value, onClick}: UseCustomFieldOption) => {
    const [customField, setCustomField] = useCustomFieldContext()
    const selected =  Array.isArray(customField.value) ? customField.value.includes(value) : customField.value === value
    const hasValue = typeof value !== 'undefined'
    const handleClick = hasValue ? (event: React.MouseEvent<any>) => {
        onClick && onClick(event)
        setCustomField(prev => ({...prev, value, dirty: true}))
    } : onClick

    return {
        ...customField,
        selected,
        handleClick,
    }
}