import classNames from '@utils/classNames'
import React, { FunctionComponent, ReactNode, memo } from 'react'
import { CSSTransition } from 'react-transition-group'
import { Variant, ComponentProps } from '../types'
import './index.scss'

interface AlertProps extends ComponentProps {
    in: boolean;
    variant?: Variant;
    dismisible?: boolean;
    dismisibleLabel?: ReactNode;
    onHide?: (event?: any) => void
}

const Alert: FunctionComponent<AlertProps> = ({in: show, variant, dismisible, dismisibleLabel, onHide, className, children}) => {
    return (
        <CSSTransition in={show} classNames="alert" timeout={300} unmountOnExit>
            <div className={classNames('alert', {}, variant && `alert-${variant}`, className)}>
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
