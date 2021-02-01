import React, { FunctionComponent, ReactNode, memo } from 'react'
import { FormUpdate } from 'formydable'
import Form from '../Form'
import Icon from '../Icon'
import is from '../../utils/is'

interface InputRawProps {
    label: string;
    value?: string | any[] | number;
    rules?: string;
    name: string;
    id?: string;
    icon?: string | ReactNode;
    disabled?: boolean;
    inline?: boolean;
    prepend?: boolean;
    noLabel?: boolean;
    onChange: FormUpdate;
    state: any;
    [rest: string]: any;
}

const InputRaw: FunctionComponent<InputRawProps> = ({ as: Component, label, value, rules, name, id, icon, prepend, noLabel, inline, children, onChange, state, ...props }) => {

    const input = ['checkbox', 'radio'].includes(props.type) && is.arr(children) 
        ? (
            (children as any).map(({label, ...rest}: any, index: number) => {
                return (
                    <Form.Label key={label} className={`d-${inline ? 'i': ''}flex flex-center-y t-size-13${inline && index !== 0? ' ml-2': ''}`}>
                        <Form.Control
                            {...rest}
                            name={name}
                            onChange={onChange}
                            checked={props.type === 'radio' 
                                ? state.value === rest.value
                                : state.value.includes(rest.value)}
                            {...props}
                            />
                            &nbsp;&nbsp;{label}
                    </Form.Label>
                )
            })
        ) : (
            <Form.Control
                as={Component}
                name={name}
                id={id || name}
                value={props.type !== 'file' ? state.value : undefined}
                onChange={onChange}
                children={children}
                {...props}/>
        )

    return (
        <Form.Field isValid={state.isValidated && !state.isInvalid} isInvalid={state.isValidated && state.isInvalid}>
            {noLabel || <Form.Label htmlFor={id || name}>{label}</Form.Label>}{inline && <br />}
            {icon ? (
                <Form.InputGroup disabled={props.disabled}>
                    {prepend && (
                        <Form.InputGroup.Prepend>
                            <Form.InputGroup.Text>
                                {typeof icon === 'string' ? <Icon name={icon} />: icon}
                            </Form.InputGroup.Text>
                        </Form.InputGroup.Prepend>
                    )}
                    {input}
                    {prepend || (
                        <Form.InputGroup.Append>
                            <Form.InputGroup.Text>
                                {typeof icon === 'string' ? <Icon name={icon} />: icon}
                            </Form.InputGroup.Text>
                        </Form.InputGroup.Append>
                    )}
                </Form.InputGroup>
            ) : (
                input
            )}
            <Form.Feedback type='invalid'>{state.isInvalid && state.message}</Form.Feedback>
        </Form.Field>
    )
}

InputRaw.defaultProps = {
    as: 'input',
    prepend: true
}

export default memo(InputRaw);
