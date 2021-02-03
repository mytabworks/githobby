import React from 'react'
import Text from '@components/Text'
import { Variant } from '@components/types'
import './index.scss'
import Icon from '@components/Icon'
import diffForHuman from '@utils/diffForHuman'

interface RepositoryProps {
    item: any;
    owner?: boolean;
}

const Repository: React.FunctionComponent<RepositoryProps> = ({item, owner}) => {
    const ownersLink = `https://github.com/${item.owner.login}`
    return (
        <div className="repository">
            <div className="repository-header">
                {owner ? (
                    <Text className="repository-title">
                        <a href={`${ownersLink}/${item.name}`} 
                            target="_blank">
                            <b>{item.name}</b>
                        </a>
                        {item.private && <span className="stars">private</span>}
                    </Text>
                ) : (
                    <Text className="repository-title">
                        <Icon name="book" />
                        <a href={ownersLink} 
                            target="_blank">
                            {item.owner.login}
                        </a>
                        {" / "}
                        <a href={`${ownersLink}/${item.name}`} 
                            target="_blank">
                            <b>{item.name}</b>
                        </a>
                        {item.private && <span className="stars">private</span>}
                    </Text>
                )}
                <span className="stars"><Icon name="star-empty" />Star {item.stargazers_count}</span>
            </div>
            {item.description && <Text as="p" className="mb-1">{item.description}</Text>}
            <div>
                {item.language && <Text as="small" className="mr-3"><span className="circle"/>{item.language}</Text>}
                <Text as="small">Updated {diffForHuman(item.updated_at)}</Text>
            </div>
        </div>
    )
}

export default Repository
