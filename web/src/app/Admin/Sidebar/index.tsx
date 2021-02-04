import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import Icon from '@components/Icon'
import Nav from '@components/Nav'

const Sidebar: React.FunctionComponent = (props) => {
    const {url} = useRouteMatch()
    return (
        <Nav tabs column>
            <Nav.Link exact to={url}>
                <Icon name="chart-line"/> Dashboard
            </Nav.Link>
            <Nav.Link to={`${url}/users`}>
                <Icon name="friends"/> Users
            </Nav.Link>
        </Nav>
    )
}

export default Sidebar
