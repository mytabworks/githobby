import React from 'react'
import Spinner from '@components/Spinner'

const Loader: React.FunctionComponent = () => (
    <div className="p-absolute top-0 bottom-0 right-0 left-0 d-flex flex-center-x pt-3">
        <Spinner/>
    </div>
)

export default Loader