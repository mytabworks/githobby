import React, { FunctionComponent } from 'react'
import { ComponentProps } from '../types'
import classNames from '../../utils/classNames'
import Text from './InputGroupText'
import Append from './InputGroupAppend'
import Prepend from './InputGroupPrepend'

interface InputGroupProps extends ComponentProps {
    readOnly?: boolean;
    disabled?: boolean;
}

interface InputGroupComponent<P> extends FunctionComponent<P> {
    Text: typeof Text;
    Append: typeof Append;
    Prepend: typeof Prepend;
}

const InputGroup: InputGroupComponent<InputGroupProps> = ({className, readOnly, disabled, children, ...props}) => {
    return (
        <div 
            className={classNames('input-group', {
                'read-only': readOnly,
                disabled
            }, className)} 
            {...props}
            >
            {children}
        </div>
    )
}

InputGroup.Text = Text
InputGroup.Append = Append
InputGroup.Prepend = Prepend

export default InputGroup
