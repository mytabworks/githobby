import React, { FunctionComponent } from 'react'
import { AliasComponentProps } from '../types'
import classNames from '../../utils/classNames'

interface FormFieldProps extends AliasComponentProps {
    isValid?: boolean;
    isInvalid?: boolean;
}

const FormField: FunctionComponent<FormFieldProps> = ({as: Component = 'div', className, isValid, isInvalid, children, ...props}) => {
    return (
        <Component 
            className={classNames('form-field', {
                'is-valid': isValid,
                'is-invalid': isInvalid,
            }, className)} 
            {...props}
            >
            {children}
        </Component>
    )
}

export default FormField
