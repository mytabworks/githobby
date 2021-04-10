import React from 'react'
import classNames from '@utils/classNames'
import { useCustomFieldOption } from '@utils/hooks/useCustomField'
import Collapse from '../Collapse'

interface OptionProps extends React.HTMLProps<HTMLDivElement> {
    value?: any;
    autoClose?: boolean;
}

const Option: React.FunctionComponent<OptionProps> = ({ value, className, children, autoClose, onClick, ...props}) => {
    const { staticProps, selected, handleClick } = useCustomFieldOption({
        value,
        onClick
    })

    return autoClose ? (
        <Collapse.Target 
            as="div" 
            eventKey={staticProps!.eventKey} 
            className={classNames("collapse-select-option", {selected}, className)} 
            onClick={handleClick}
            {...(props as any)}>
            {children}
        </Collapse.Target>
    ) : (
        <div 
            className={classNames("collapse-select-option", {selected}, className)}
            data-value={value}
            onClick={handleClick} 
            {...props}>
            {children}
        </div>
    )
}

export default Option
