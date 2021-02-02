import React, { useEffect, useState } from 'react'
import Row from '@components/Layout/Row'
import Col from '@components/Layout/Col'
import Container from '@components/Layout/Container'
import Form from '@components/Form'
import Button from '@components/Button'
import Card from '@components/Card'
import { Variant } from '@components/types'
import { useGithub } from '@utils/hooks/useGithub'
import Loader from '../../Loader'

interface LandingProps {
    
}

const Landing: React.FunctionComponent<LandingProps> = () => {
    const [search, setSearch] = useState<string>('')
    const request = useGithub(search ? '/search/repositories' : '/repositories')

    useEffect(() => {
        request.call({
            params: { q: search, per_page: 100 }
        })
    }, [search])

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formdata = new FormData(event.target as HTMLFormElement)
        const search = formdata.get("search") as string
        setSearch(search)
    }
    return (
        <div className="pt-5">
            <Form onSubmit={handleSubmit}>
                <Form.InputGroup>
                    <Form.Control name="search" defaultValue={search} placeholder="search repository"/>
                    <Form.InputGroup.Append>
                        <Button className="px-5" variant={Variant.Secondary} loading={request.loading} type="submit">SUBMIT</Button>
                    </Form.InputGroup.Append>
                </Form.InputGroup>
            </Form>
            <Card className="mt-4" variant={Variant.Primary}>
                <Card.Header>
                    <h3>repository</h3>
                </Card.Header>
                <Card.Body>
                    <Container className="py-3">
                        {(search ? request.value?.data.items : request.value?.data)?.map((item: any) => {
                            return (
                                <Row key={item.id}>
                                    <Col><a href={item.svn_url}>{item?.name}</a></Col>
                                </Row>
                            )
                        })}
                    </Container>
                    {request.loading && <Loader />}
                </Card.Body>
            </Card>
        </div>
    )
}

export default Landing
