import React, { useEffect } from 'react'
import { useAuthRequest } from '@utils/hooks/useAuthRequest'
import { useTable } from '@utils/hooks/useTable'
import diffForHuman from '@utils/diffForHuman'

const Users: React.FunctionComponent = () => {
    const request = useAuthRequest('/users')
    const {sort, page, filters} = useTable()
    useEffect(() => {
        request.call({
            params: {
                sortOrder: sort.order,
                sortBy: sort.orderBy,
                filters: JSON.stringify(filters),
                page
            }
        })
    }, [sort, page, filters])
    return (
        <div>
            <table>
                <thead>
                    <tr><th>ID</th><th>NAME</th><th>EMAIL</th><th>ROLES</th><th>CREATED</th></tr>
                </thead>
                <tbody>
                    {request.value?.data.map((row: any) => {
                        return (
                            <tr key={row.id}>
                                <td>{row.id}</td>
                                <td>{row.name}</td>
                                <td>{row.email}</td>
                                <td>{row.roles}</td>
                                <td>{diffForHuman(row.created_at)}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Users
