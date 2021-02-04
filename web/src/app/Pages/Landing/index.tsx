import React, { useEffect, useState } from 'react'
import Form from '@components/Form'
import Button from '@components/Button'
import Card from '@components/Card'
import { Variant } from '@components/types'
import { useGithub } from '@utils/hooks/useGithub'
import Text from '@components/Text'
import HeadGear from '@components/HeadGear'
import Loader from '@app/Loader'
import Repository from './Repository'

const Landing: React.FunctionComponent = () => {
    const [search, setSearch] = useState<string>('a')
    const request = useGithub('/search/repositories')

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
            <HeadGear
                title="Githobby | Search"
                description="Githobby is a github search engine"
                />
            <Form onSubmit={handleSubmit}>
                <Form.InputGroup>
                    <Form.Control name="search" placeholder="search repository"/>
                    <Form.InputGroup.Append>
                        <Button className="px-5" variant={Variant.Secondary} loading={request.loading} type="submit">SUBMIT</Button>
                    </Form.InputGroup.Append>
                </Form.InputGroup>
            </Form>
            <Card className="mt-4" variant={Variant.Primary}>
                <Card.Header>
                    <Text as="h3" className="mb-0">repository</Text>
                </Card.Header>
                <Card.Body className="py-4">
                    {request.value?.items?.map((item: any) => {
                        return (
                            <Repository key={item.id} item={item} />
                        )
                    })}
                    {request.loading && <Loader />}
                </Card.Body>
            </Card>
        </div>
    )
}

export default Landing
