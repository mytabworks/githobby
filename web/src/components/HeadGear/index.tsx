import React from 'react'
import ReactDOM from 'react-dom'

interface HeadGearProps {
    title: string;
    description: string;
    type?: string;
}

const HeadGear: React.FunctionComponent<HeadGearProps> = ({ title, description, type}) => {
    const url = window?.location.href
    const image = `${window?.location.origin}/icons/icon-192x192.png`
    return ReactDOM.createPortal(
        <>
            <title>{title}</title>
            <meta name="title" content={title} />
            <meta name="description" content={description} />
            <meta property="og:type" content={type} />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={url} />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={image} />
        </>
        , document?.head)
}

HeadGear.defaultProps = {
    type: "article"
}

export default HeadGear