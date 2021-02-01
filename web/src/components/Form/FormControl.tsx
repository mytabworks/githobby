import React, { FunctionComponent, memo, ChangeEventHandler } from 'react'
import { AliasComponentProps } from '../types'
import classNames from '../../utils/classNames'

type FormControlElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement

interface FormControlProps extends AliasComponentProps {
    onChange?: ChangeEventHandler<FormControlElement>
}

const FormControl: FunctionComponent<FormControlProps> = memo(({as: Component = 'input', className, ...props}) => {
    return (
        <Component 
            className={classNames('form-control', {}, className)} 
            {...props}
            />
    )
})

export default FormControl
