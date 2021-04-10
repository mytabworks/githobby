import { createContext, useContext } from 'react'

type ModalContextProp = {
    onHide?: () => void
}

export const ModalContext = createContext<ModalContextProp>({})

export const useModal = () => {
    return useContext(ModalContext)
}