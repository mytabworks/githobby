import { useSession } from '@components/Session'
import Loader from '@app/Loader'
import React from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'
import { Location } from 'history'

interface ConditionalRouteProps extends RouteProps {
    condition: boolean;
    redirectTo: string;
    children: React.ReactNode;
    whenLocationStateFrom?: boolean;
    onRedirect?: (redirected: boolean, location: Location<any>) => void;
}

const ConditionalRoute: React.FunctionComponent<ConditionalRouteProps> = ({ condition, redirectTo, children, whenLocationStateFrom, onRedirect, ...rest}) => {
    const [{loading}] = useSession()
    return (
        <Route
            {...rest}
            render={({ location }) => {

                if(onRedirect) {
                    onRedirect(!condition, location)
                }

                return loading ? (
                    <Loader/>
                ) : (
                    condition ? (
                        children
                    ) : (
                        <Redirect
                            to={{
                                pathname: whenLocationStateFrom ? (location as any).state?.from || redirectTo : redirectTo,
                                state: { from: location.pathname }
                            }}
                        />
                    )
                )
            }}
            />
    )
}

export default ConditionalRoute