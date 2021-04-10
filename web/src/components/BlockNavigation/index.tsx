import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { Prompt, useHistory } from 'react-router-dom'
import Modal from '../Modal'
import Button from '../Button'
import { Variant } from '@components/types'

type StatesType = {
    show: boolean;
    nextLocation: string;
}

interface BlockNavigationProps {
    when: boolean;
    message: React.ReactNode;
    title: React.ReactNode;
    confirm?: React.ReactNode;
    cancel?: React.ReactNode;
}

const BlockNavigation: React.FunctionComponent<BlockNavigationProps> = ({ when, message, title, confirm, cancel }) => {
    const [{ show, nextLocation }, setStates] = useState<StatesType>({
        show: false,
        nextLocation: '',
    })

    const confirmed = useRef<boolean>(false)

    const history = useHistory()

    const handleBlockedNavigation = ({ pathname }: any) => {
        if(!confirmed.current) {
            setStates({
                show: true,
                nextLocation: pathname
            })
        }

        return confirmed.current
    }

    const handleModalClose = () => {
        setStates({
            show: false,
            nextLocation: ''
        })
    }

    const handleModalConfirm = () => {
        confirmed.current = true

        handleModalClose()

        history.push(nextLocation)
    }

    return (
        <>
            <Prompt 
                when={when}
                message={handleBlockedNavigation} />
            <Modal
                in={show}
                onHide={handleModalClose}
                backdrop="static"
            >
                <Modal.Header>
                <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {message}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant={Variant.INFO} onClick={handleModalConfirm}>
                        {confirm}
                    </Button>
                    <Button variant={Variant.DANGER} onClick={handleModalClose}>
                        {cancel}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

BlockNavigation.defaultProps = {
    confirm: 'Yes',
    cancel: 'No'
}

if(process.env.NODE_ENV === 'development') {
    BlockNavigation.propTypes = {
        when: PropTypes.bool.isRequired,
        message: PropTypes.any.isRequired,
        title: PropTypes.any.isRequired,
        confirm: PropTypes.any,
        cancel: PropTypes.any
    }
}

export default BlockNavigation
