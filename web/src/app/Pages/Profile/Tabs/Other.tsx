import React from 'react'
import Template from './Template'
import { useGithub } from '@utils/hooks/useGithub'
import Loader from '@app/Loader'
import Repository from '@app/Pages/Landing/Repository'
import HeadGear from '@components/HeadGear'
import Text from '@components/Text'
import Row from '@components/Layout/Row'
import Col from '@components/Layout/Col'

interface OtherProps {
    title: string;
    fallback: React.ReactNode;
    request: ReturnType<typeof useGithub>
}

const Other: React.FunctionComponent<OtherProps> = ({ title, request, fallback }) => {
    return (
        <Template icon="star-full" title={title}>
            <HeadGear
                title={`Githobby | ${title}`}
                description={`githobby ${title}`}
                />
            {request.value && request.value.length ? (
                    request.value?.map((item: any) => {
                        return (
                            item.type === 'User' ? (
                                <Row key={item.id} className="py-4">
                                    <Col sm={{span: 6, offset: 3}}>
                                        <img src={item.avatar_url} />
                                        <div className="repository-title mt-3">
                                            <a href={item.html_url} target="_blank">
                                                <Text as="h2">{item.login}</Text>
                                            </a>
                                        </div>
                                    </Col>
                                </Row>
                            ) : (
                                <Repository key={item.id} item={item} owner />
                            )
                        )
                    })
                ) : (
                    fallback
                )
            }
            {request.loading && <Loader/>}
        </Template>
    )
}

export default Other
