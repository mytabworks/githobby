import React, { FC } from 'react'

type Props = {}

export const App: FC<Props> = (props) => {
    React.useEffect(() => {
        fetch("http://localhost:4000")
    }, [])
    return (
        <div>working application</div>
    )
}
