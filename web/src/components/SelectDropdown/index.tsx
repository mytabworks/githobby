import React, { useState, useRef, memo } from 'react'
import classNames from '@utils/classNames'
import { useCustomField, CustomFieldContext, CustomFieldEvent } from '@utils/hooks/useCustomField'
import { MemoFunction } from '../types'
import Option from './Option'
import './index.scss'

type SelectDropdownOption = {
    label?: string;
    value: string;
    labelNode?: React.ReactNode
}

type Observables = {
    target: HTMLInputElement | HTMLSelectElement | null;
    preventBlur: boolean;
    preventFocus: boolean;
    notInOptionLabel: string;
}

export interface SelectDropdownProps extends Omit<React.HTMLProps<HTMLDivElement>, 'onChange'> {
    name: string;
    value?: any;
    placeholder?: string;
    disabled?: boolean;
    multiple?: boolean;
    onChange?: (event: CustomFieldEvent) => void;
    options: SelectDropdownOption[];
    prepend?: React.ReactNode;
    append?: React.ReactNode;
    closeEverySelect?: boolean;
    showCustomOptionLabel?: boolean;
}

interface SelectDropdownFunction<P> extends MemoFunction<P> {
    Option?: typeof Option;
}

const SelectDropdown: SelectDropdownFunction<SelectDropdownProps> = memo(({name, value, placeholder, disabled, multiple, onChange, options, prepend, append, closeEverySelect, showCustomOptionLabel, className, children}) => {
    const [{ show }, setStates] = useState<{ show: boolean }>({
        show: false
    })
    const provide = useCustomField({
        name,
        value: multiple ? Array.isArray(value) ? value : [] : value || "",
        onChange
    })
    const [customField] = provide
    const observables = useRef<Observables>({
        target: null,
        preventBlur: false,
        preventFocus: false,
        notInOptionLabel: ""
    }).current

    const toggleHandlers = {
        onMouseDown: () => {
            if(show) {
                observables.preventFocus = true
            }
        },
        onMouseUp: () => {
            if(!observables.preventFocus) {
                observables.target?.focus()
            } else {
                observables.preventFocus = false
            }
        }
    }

    const handleFocus = () => {
        setStates(prev => ({...prev, show: true }))
    }

    const handleBlur = () => {
        if(!observables.preventBlur) {
            setStates(prev => ({...prev, show: false }))
        }
    }

    const optionContainerHandlers = {
        // one step faster than onBlur so it can stop the change when clicking 
        onMouseDown: () => {
            observables.preventBlur = true
            observables.notInOptionLabel = ""
        },
        // core selecting a option
        onMouseUp: (event: any) => { 
            observables.preventBlur = false
            observables.target?.focus()

            const isOption = event.target.matches('.select-option')
            const isSelected = event.target.matches('.select-option.selected')
            const isNotSelected = event.target.matches('.select-option.unclosable')

            if(showCustomOptionLabel && isOption) {
                observables.notInOptionLabel = event.target.textContent
            }

            if(isNotSelected || isSelected) return;
            
            if((!multiple && isOption) || closeEverySelect) {
                observables.target?.blur()
            }
        }
    }

    const getSelected = () => {
        if(multiple) {
            return;
        } else {
            return options.find(option => option.value === customField.value)?.label || observables.notInOptionLabel
        }
            
    }
    
    return (
        <div className={classNames('select-dropdown', {show, multiple, disabled})}>
            <div className={classNames('select-toggle', {}, className)} {...toggleHandlers} aria-hidden={!show}>
                {prepend}
                <input 
                    ref={(target) => observables.target = target} 
                    value={customField.value}
                    onChange={() => {}}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                    placeholder={placeholder}/>
                {getSelected() || <span className="select-placeholder">{placeholder}</span>}
                {append}
            </div>
            <div className="select-options-container" {...optionContainerHandlers}>
                <CustomFieldContext.Provider value={provide}>
                    {options.map((option) => {
                        return (
                            <Option key={option.value} value={option.value}>
                                {option.labelNode || option.label || option.value}
                            </Option>
                        )
                    })}
                    {children}
                </CustomFieldContext.Provider>
            </div>
        </div>
    )
})

SelectDropdown.Option = Option

SelectDropdown.defaultProps = {
    multiple: false,
    disabled: false,
    closeEverySelect: false,
}

export default SelectDropdown
