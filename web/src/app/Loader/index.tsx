import React from 'react'
import Spinner from '@components/Spinner'
import classNames from '@utils/classNames'

interface LoaderProps {
    className?: string;
}

const Loader: React.FunctionComponent<LoaderProps> = ({ className }) => (
    <div className={classNames("p-absolute top-0 bottom-0 right-0 left-0 d-flex flex-center-x pt-3", {}, className)}>
        <Spinner/>
    </div>
)

export default Loader