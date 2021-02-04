import React from 'react'
import classNames from '@utils/classNames'
import { ComponentProps } from '@components/types'
import index from '@app/Pages/NotFound'
import './index.scss'

interface TableProps extends ComponentProps {
    
}

const Table: React.FunctionComponent<TableProps> = ({ className, children }) => {
    return (
        <table className={classNames('table', {}, className)}>
            {children}
        </table>
    )
}

export default Table
