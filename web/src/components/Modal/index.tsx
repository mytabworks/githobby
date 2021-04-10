import React, { FunctionComponent, ReactNode } from 'react'
import ReactDOM from 'react-dom'
import classNames from '@utils/classNames'
import { CSSTransition } from 'react-transition-group'
import { ModalContext } from './hooks'
import Header from './Header'
import Title from './Title'
import Body from './Body'
import Footer from './Footer'
import Close from './Close'
import { Variant } from '../types'
import './index.scss'

interface ModalPropType {
    in: boolean;
    fade?: boolean;
    variant?: Variant;
    fullscreen?: boolean;
    scrollable?: boolean;
    centered?: boolean;
    dashboard?: boolean;
    className?: string;
    onHide?: () => void
    children: ReactNode;
    backdrop?: string;
    size?: "sm" | "lg" | "xl";
}

interface ModalComponent<P> extends FunctionComponent<P> {
    Header: typeof Header;
    Title: typeof Title;
    Body: typeof Body;
    Footer: typeof Footer;
    Close: typeof Close;
}

const Modal: ModalComponent<ModalPropType> = ({ in: show, children, fade = false, variant, fullscreen = false, scrollable = false, centered = false, dashboard = false, className, backdrop, size, onHide }) => {
    const handleBackdrop = (e: any): void => {
        const target = e.target
        if(target && target.matches('.modal')) {
            onHide && onHide()
        }
    }
    return (
        <ModalContext.Provider value={{onHide}}>
            {ReactDOM.createPortal((
                <CSSTransition in={show} timeout={300} classNames="modal" unmountOnExit>
                    <div className={classNames('modal', { fade, fullscreen }, variant && `modal-${variant}`, className)} tabIndex={-1} role='dialog' onClick={backdrop !== 'static' ? handleBackdrop : undefined}>
                        <div className={classNames(`modal-dialog`, {'modal-dialog-scrollable': scrollable, 'modal-dialog-centered': centered, 'modal-dialog-dashboard': dashboard}, size ? `modal-${size}` : '')} role="document">
                            <div className="modal-content">
                                {children}
                            </div>
                        </div>
                    </div>
                </CSSTransition>
            ), document?.body)} 
            {fullscreen || ReactDOM.createPortal((
                <CSSTransition in={show} timeout={300} classNames={{
                    enter: 'fade',
                    enterActive: 'show',
                    enterDone: 'show',
                    exit: 'fade',
                    exitActive: 'fade',
                    exitDone: 'fade',
                   }}
                unmountOnExit
                onEntering={() => {
                    document.body.classList.add('modal-open')
                }}
                onExited={() => {
                    const hasOtherModal = document.body.querySelector('.modal')
                    if(!hasOtherModal)
                        document.body.classList.remove('modal-open')
                }}>
                    <div className='modal-backdrop' />
                </CSSTransition>
            ), document?.body)}
        </ModalContext.Provider>
	);
};

Modal.Header = Header
Modal.Title = Title
Modal.Body = Body
Modal.Footer = Footer
Modal.Close = Close

export default Modal;
