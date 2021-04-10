import React from 'react'
import { useCustomField, CustomFieldContext, CustomFieldEvent } from '@utils/hooks/useCustomField'
import classNames from '@utils/classNames'
import Collapse from '../Collapse'
import Icon from '../Icon'
import Option from './Option'
import './index.scss'

interface SelectCollapseProps extends Omit<React.HTMLProps<HTMLDivElement>, 'onChange'> {
    options: { value: any; label: any }[];
    placeholder: string;
    eventKey: string;
    name: string;
    value?: any;
    onChange?: (event: CustomFieldEvent) => void;
    autoClose?: boolean;
}

interface SelectCollapseFunction<P> extends React.FunctionComponent<P> {
    Option: typeof Option
}

const SelectCollapse: SelectCollapseFunction<SelectCollapseProps> = ({ value, name, options, placeholder, eventKey, className, onChange, autoClose, children, ...props }) => {
    const provide = useCustomField({
        name,
        value,
        onChange,
        staticProps: {
            eventKey
        }
    })

    const [states] = provide
    
    return (
        <CustomFieldContext.Provider value={provide}>
            <div className={classNames("collapse-select", {}, className)} {...props}>
                <Collapse.Target as="a" className="collapse-select-toggle" eventKey={eventKey}>
                    {options?.find((option) => option.value === states.value)?.label || <span className="collapse-select-placeholder">{placeholder}</span>}
                    <Icon name="angle-right"/>
                </Collapse.Target>
                <Collapse eventKey={eventKey} transition="fast">
                    <div className="collapse-select-container">
                        <div className="collapse-select-content">
                            {options.map((option) => {
                                return (
                                    <Option key={option.value} value={option.value} autoClose={autoClose}>
                                        {option.label}
                                    </Option>
                                )
                            })}
                            {children}
                        </div>
                    </div>
                </Collapse>
            </div>
        </CustomFieldContext.Provider>
    )
}

SelectCollapse.Option = Option

export default SelectCollapse
