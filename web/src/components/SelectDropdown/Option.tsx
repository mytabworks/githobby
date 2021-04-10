import React, { memo } from 'react'
import classNames from '@utils/classNames'
import { useCustomFieldOption } from '@utils/hooks/useCustomField'

interface OptionProps extends React.HTMLProps<HTMLDivElement> {
    value?: any;
    unclosable?: boolean;
}

const Option: React.FunctionComponent<OptionProps> = memo(({ value, unclosable, className, onClick, children, ...props }) => {
    const { selected, handleClick } = useCustomFieldOption({
        value,
        onClick
    })
    return (
        <div className={classNames("select-option", { selected, unclosable }, className)}
            data-value={value}
            onClick={handleClick}
            {...props}>
            {children}
        </div>
    )
})

Option.defaultProps = {
    selected: false
}

export default Option
