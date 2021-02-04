import React, { useCallback, useEffect } from 'react'
import { useAuthRequest } from '@utils/hooks/useAuthRequest'
import { SortOrder, useTable } from '@utils/hooks/useTable'
import diffForHuman from '@utils/diffForHuman'
import Table from '@components/Table'
import Button from '@components/Button'
import Icon from '@components/Icon'
import { Variant } from '@components/types'
import Form from '@components/Form'
import Row from '@components/Layout/Row'
import Col from '@components/Layout/Col'
import Text from '@components/Text'

const Users: React.FunctionComponent = () => {
    const request = useAuthRequest('/users')
    const {sort, page, filters, filterProps, filterSubmit, sortProps} = useTable()
    useEffect(() => {
        request.call({
            params: {
                sortOrder: sort.order?.toUpperCase(),
                sortBy: sort.orderBy,
                filters: JSON.stringify(filters),
                page
            }
        })
    }, [sort, page, filters])

    const hanldeSubmitFilter = (event: React.FormEvent) => {
        event.preventDefault()
        filterSubmit()
    }

    const THSotable = useCallback(({title, dataIndex}) => {
        return (
            <th className="cursor-pointer" {...sortProps({ 
                dataIndex, 
                render: (order) => (
                    <span className="pre">
                        {title} {order === SortOrder.ASC ? (
                            <>&#8593;</>
                        ) : order === SortOrder.DESC ? (
                            <>&#8595;</>
                        ) : (
                            <>&#10572;</>
                        )}
                    </span>
                )})}/>
        )
    }, [sortProps])
    
    return (
        <div>
            <Text as="h1" className="mb-5"><Icon name="friends"/>Users</Text>
            <Form onSubmit={hanldeSubmitFilter}>
                <Row>
                    <Col>
                        <Form.Control 
                            placeholder="search name..."
                            {...filterProps({ dataIndex: 'name', value: "{search}%"})}/>
                    </Col>
                    <Col>
                        <Form.Control 
                            placeholder="search email..."
                            {...filterProps({ dataIndex: 'email', value: "{search}%"})}/>
                    </Col>
                    <Col sm={2}>
                        <Form.Control as="select"
                            {...filterProps({ dataIndex: 'roles', value: "{search}"})}>
                            <option value="">select roles</option>
                            <option value="admin">ADMIN</option>
                            <option value="client">CLIENT</option>
                        </Form.Control>
                    </Col>
                    <Col sm={2}>
                        <Button type="submit" block variant={Variant.Secondary}>SUBMIT</Button>
                    </Col>
                </Row>
            </Form>
            <Table>
                <thead>
                    <tr>
                        <THSotable title="ID" dataIndex="id" />
                        <THSotable title="NAME" dataIndex="name" />
                        <THSotable title="EMAIL" dataIndex="email" />
                        <th>ROLES</th>
                        <THSotable title="CREATED" dataIndex="created_at" />
                        <th>ACTION</th>
                    </tr>
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
                                <td>
                                    <span className="d-flex flex-center-x">
                                        <Button variant={Variant.Danger} size="xs">
                                            <Icon name="trash"/>
                                        </Button>
                                    </span>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
    )
}

export default Users
