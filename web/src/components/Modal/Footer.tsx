import React, { memo } from 'react'

interface FooterProps extends React.HTMLProps<HTMLDivElement> {
    noBorder?: boolean;
}

const Footer: React.FunctionComponent<FooterProps> = memo(({ children, noBorder, ...props }) => {
    return (
        <div {...props} className={`modal-footer${noBorder ? ' no-border' : ''}`}>
            {children}
        </div>
    )
})

export default Footer
