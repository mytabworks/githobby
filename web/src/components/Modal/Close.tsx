import React from 'react'
import { useModal } from './hooks'

const Close: React.FunctionComponent<React.HTMLProps<HTMLButtonElement>> = ({ children, ...props }) => {
    const { onHide } = useModal()
    return (
        <button {...props} type="button" className="modal-close" onClick={onHide} data-dismiss="modal" aria-label="Close">
            {children}
        </button>
    )
}

export default Close
