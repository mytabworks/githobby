import React from 'react'
import Text from '@components/Text'
import './index.scss'
import Icon from '@components/Icon'

interface TemplateProps {
    icon?: string;
    title: string;
    children: React.ReactNode;
}

const Template: React.FunctionComponent<TemplateProps> = ({ icon, title, children }) => {
    return (
        <div className="tab-content">
            <Text as="h2">{icon && <Icon name={icon}/>}{title}</Text>
            <div className="tab-content-body">
                {children}
            </div>
        </div>
    )
}

export default Template
