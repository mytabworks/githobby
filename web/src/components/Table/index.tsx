import React from 'react'
import classNames from '@utils/classNames'
import index from '@app/Pages/NotFound'
import './index.scss'

interface TableProps extends React.HTMLProps<HTMLTableElement> {
    
}

const Table: React.FunctionComponent<TableProps> = ({ className, children, ...props }) => {
    return (
        <table className={classNames('table', {}, className)} {...props}>
            {children}
        </table>
    )
}

export default Table
