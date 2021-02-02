import React from 'react'
import './index.scss'

interface SpinnerProps {
    
}

const Spinner: React.FunctionComponent<SpinnerProps> = () => {
    return (
        <div className="spinner">
            <div/>
            <div/>
            <div/>
            <div/>
        </div>
    )
}

export default Spinner
