import React from 'react'
import Template from './Template'
import { useGithub } from '@utils/hooks/useGithub'
import Loader from '@app/Loader'
import Repository from '@app/Pages/Landing/Repository'
import HeadGear from '@components/HeadGear'

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
                            <Repository key={item.name} item={item} owner />
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
