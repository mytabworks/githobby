import React from 'react'
import Close from './Close'

interface HeaderProps extends React.HTMLProps<HTMLDivElement> {
    btnCloseLabel?: React.ReactNode;
    noBorder?: boolean;
}

const Header: React.FunctionComponent<HeaderProps> = ({ children, btnCloseLabel, noBorder, ...props }) => {
    return (
        <div {...props} className={`modal-header${noBorder ? ' no-border' : ''}`}>
            {children}
            <Close>{btnCloseLabel}</Close>
        </div>
    )
}

Header.defaultProps = {
    btnCloseLabel: <span aria-hidden="true">&times;</span>
}

export default Header
