import Loader from '@app/Loader'
import Alert from '@components/Alert'
import Text from '@components/Text'
import { Variant } from '@components/types'
import diffForHuman from '@utils/diffForHuman'
import { useAuthRequest } from '@utils/hooks/useAuthRequest'
import React, { useEffect } from 'react'
import Fallback from '../Fallback'
import Template from '../Template'

interface ActivitiesProps {
    
}

const Activities: React.FunctionComponent<ActivitiesProps> = (props) => {
    const request = useAuthRequest('/user/activities')

    useEffect(() => {
        request.call()
    }, [])

    return (
        <Template icon="star-full" title="Activities">
            {request.value?.data.length ? (
                    request.value?.data.map((activity: any) => {
                        return (
                            <Alert key={activity.id} className="d-flex flex-spb-x" in={true} variant={Variant.Success}>
                                <Text as="span">
                                    {activity.description}
                                </Text>
                                <Text as="small">
                                    {diffForHuman(activity.created_at)}
                                </Text>
                            </Alert>
                        )
                    })
                ) : (
                    <Fallback icon="bell" message="You don't have any activities" />
                )
            }
            {request.loading && <Loader/>}
        </Template>
    )
}

export default Activities
