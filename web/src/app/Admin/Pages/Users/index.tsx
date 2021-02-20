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
import Alert from '@components/Alert'
import HeadGear from '@components/HeadGear'
import Loader from '@app/Loader'

const Users: React.FunctionComponent = () => {
    const {sort, page, filters, filterProps, filterSubmit, sortProps, paginateProps} = useTable()
    const request = useAuthRequest('/users')
    const deleteRequest = useAuthRequest('/user', {
        method: "DELETE"
    })
    const totalPage = Math.ceil((request.value?.totalCount || 0)/10)
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
                            <>&#8693;</>
                        )}
                    </span>
                )})}/>
        )
    }, [sortProps])
    
    return (
        <div className="mt-3">
            <HeadGear
                title="Githobby | Admin - Users"
                description=""
                />
            <Text as="h1" className="mb-3"><Icon name="friends"/>Users</Text>
            <Alert in={deleteRequest.value?.status === "ok"} variant={Variant.Success}>
                Successfully deleted
            </Alert>
            <Alert in={!!deleteRequest.error} variant={Variant.Danger}>
                {deleteRequest.error}
            </Alert>
            <Alert in={!!request.error} variant={Variant.Danger}>
                {request.error}
            </Alert>
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
            <div className="p-relative">
                <Table>
                    <thead>
                        <tr>
                            <THSotable title="ID" dataIndex="id" />
                            <THSotable title="NAME" dataIndex="name" />
                            <THSotable title="EMAIL" dataIndex="email" />
                            <th>ROLES</th>
                            <THSotable title="CREATED" dataIndex="created_at" />
                            <th><span className="d-flex flex-end-x">ACTION</span></th>
                        </tr>
                    </thead>
                    <tbody>
                        {request.value?.data && request.value?.data?.length ? (
                            request.value?.data.map((row: any) => {
                                return (
                                    <tr key={row.id}>
                                        <td>{row.id}</td>
                                        <td>{row.name}</td>
                                        <td>{row.email}</td>
                                        <td>{row.roles}</td>
                                        <td>{diffForHuman(row.created_at)}</td>
                                        <td>
                                            <span className="d-flex flex-end-x">
                                                <Button variant={Variant.Danger} size="xs" onClick={() => {
                                                    if(window.confirm(`are you sure you want to delete ${row.name}`)) {
                                                        deleteRequest.call({
                                                            params: { id: row.id }
                                                        }).then(() => {
                                                            request.call({
                                                                params: {
                                                                    sortOrder: sort.order?.toUpperCase(),
                                                                    sortBy: sort.orderBy,
                                                                    filters: JSON.stringify(filters),
                                                                    page
                                                                }
                                                            })
                                                        })
                                                    }
                                                }}>
                                                    <Icon name="trash"/>
                                                </Button>
                                            </span>
                                        </td>
                                    </tr>
                                )
                            })
                        ) : (
                            <tr>
                                <td colSpan={6}>
                                    <div className="py-5">
                                    {request.complete && <Text align="center" as="h3">NO DATA</Text>}
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
                <div className="d-flex flex-end-x">
                    <Button 
                        className="px-3 mr-1" 
                        size="sm" 
                        variant={Variant.Primary}
                        disabled={page <= 1} 
                        {...paginateProps(page - 1)}>
                            <Icon name="arrow-left"/>
                    </Button>
                    {new Array(totalPage).fill(0).map((_, index) => {
                        const pageNumber = index + 1
                        return (
                            <Button 
                                key={pageNumber}
                                className="px-3 mr-1" 
                                size="sm" 
                                variant={page === pageNumber? Variant.Secondary : Variant.Primary} 
                                {...paginateProps(pageNumber)}>
                                    {pageNumber}
                            </Button>
                        )
                    })}
                    <Button 
                        className="px-3 mr-1" 
                        size="sm" 
                        variant={Variant.Primary}
                        disabled={page >= totalPage} 
                        {...paginateProps(page - 1)}>
                            <Icon name="arrow-right"/>
                    </Button>
                </div>
                {(request.loading || deleteRequest.loading) && <Loader className="flex-center-y"/>}
            </div>
        </div>
    )
}

export default Users
