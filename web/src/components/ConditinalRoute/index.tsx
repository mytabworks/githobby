import { useSession } from '@components/Session'
import Loader from '@app/Loader'
import React from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'

interface ConditionalRouteProps extends RouteProps {
    condition: boolean;
    redirectTo: string;
    children: React.ReactNode;
}

const ConditionalRoute: React.FunctionComponent<ConditionalRouteProps> = ({ condition, redirectTo, children, ...rest}) => {
    const [{loading}] = useSession()
    return (
        <Route
            {...rest}
            render={({ location }) =>
                loading ? (
                    <Loader/>
                ) : (
                    condition ? (
                        children
                    ) : (
                        <Redirect
                            to={{
                            pathname: redirectTo,
                            state: { from: location }
                            }}
                        />
                    )
                )
            }
            />
    )
}

export default ConditionalRoute
