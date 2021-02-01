import React, { FunctionComponent } from 'react'
import Control from './FormControl'
import Field from './FormField'
import Label from './Label'
import InputGroup from './InputGroup'
import Feedback from './Feedback'
import './index.scss'

interface FormComponent<P extends HTMLFormElement = any> extends FunctionComponent<P> {
    Control: typeof Control;
    Field: typeof Field;
    Label: typeof Label; 
    InputGroup: typeof InputGroup;
    Feedback: typeof Feedback;
}

const Form: FormComponent = ({children, ...props}) => {
    return (
        <form {...props}>
            {children}
        </form>
    )
}

Form.Control = Control
Form.Field = Field
Form.Label = Label
Form.InputGroup = InputGroup
Form.Feedback = Feedback

export default Form
