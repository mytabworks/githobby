import React, { createContext, useContext, useReducer } from 'react'

export const SessionContext = createContext<any>([])

export const useSession = (): [SessionState, React.Dispatch<ReducerAction>] => { 
    return useContext(SessionContext)
}

export enum UserRole {
    ADMIN = "admin",
    CLIENT = "client"
}

export interface UserProps {
    id: string;
    name: string;
    email: string;
    profile_img: string;
    roles: UserRole[];
} 

export enum SessionActionType {
    SET_TOKEN = "set-token",
    SET_USER = "set-user"
}

export interface SessionState {
    initial: boolean;
    loading: boolean;
    token: string;
    user: UserProps | null
}

interface ReducerAction {
    type: SessionActionType;
    payload: any;
}

const reducer: React.Reducer<SessionState, ReducerAction> = (prev, action) => {
    switch(action.type) {
        case SessionActionType.SET_TOKEN:
            return {
                ...prev,
                initial: false,
                token: action.payload
            }
            break;
        case SessionActionType.SET_USER:
            return {
                ...prev,
                loading: false,
                user: action.payload
            }
            break;
        default:
            return prev
            break;
    }
}

interface SessionProps {
    defaults: SessionState;
    children: React.ReactNode;
}

const Session: React.FunctionComponent<SessionProps> = ({defaults, children}) => {
    const value = useReducer(reducer, defaults)
    return (
        <SessionContext.Provider value={value}>
            {children}
        </SessionContext.Provider>
    )
}

export default Session
