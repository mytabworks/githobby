import React, { FunctionComponent, ReactNode, memo } from 'react'
import { CSSTransition } from 'react-transition-group'
import { Variant } from '../types'
import './index.scss'

interface AlertProps {
    in: boolean;
    variant?: Variant;
    dismisible?: boolean;
    dismisibleLabel?: ReactNode;
    onHide?: (event?: any) => void
    children: ReactNode;
}

const Alert: FunctionComponent<AlertProps> = ({in: show, variant, dismisible, dismisibleLabel, onHide, children}) => {
    return (
        <CSSTransition in={show} classNames="alert" timeout={300} unmountOnExit>
            <div className={`alert${variant ? ` alert-${variant}` : ''}`}>
                {dismisible && <button type="button" className="alert-close" onClick={onHide}>{dismisibleLabel}</button>}
                {children}
            </div>
        </CSSTransition>
    )
}

Alert.defaultProps = {
    in: true,
    dismisibleLabel: <span aria-hidden="true">&times;</span>
}

export default memo(Alert)
