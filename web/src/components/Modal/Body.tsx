import React, { memo } from 'react'

interface BodyProps extends React.HTMLProps<HTMLDivElement> {
    shallow?: boolean;
}

const Body: React.FunctionComponent<BodyProps> = memo(({ shallow, children }) => {
    return (
        <div className={`modal-body${shallow ? ' shallow' : ''}`}>
            {children}
        </div>
    )
})

export default Body
