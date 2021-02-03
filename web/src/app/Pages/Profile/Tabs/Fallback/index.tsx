import React from 'react'
import Text from '@components/Text'
import Icon from '@components/Icon'

interface FallbackProps {
    icon: string;
    message: string;
}

const Fallback: React.FunctionComponent<FallbackProps> = ({ icon, message }) => {
    return (
        <div className="d-flex flex-center py-5">
            <div>
                <Text as="h2" align="center">
                    <Icon name={icon}/>
                </Text>
                <Text as="h3" align="center">
                    {message}
                </Text>
            </div>
        </div>
    )
}

export default Fallback
