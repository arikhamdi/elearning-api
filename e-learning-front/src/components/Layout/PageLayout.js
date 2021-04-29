import React from 'react'
import { Link } from 'react-router-dom';

import '../pages/Page.css';

const PageLayout = ({
    title,
    content,
    link,
    linkText
}) => {

        return (
            <div 
                className="w-100 text-center" 
                style={{margin: "150px 0"}}
                >
            <h1 className="display-4">{title}</h1>
            <p className="lead">{content}</p>
            {link && <Link className="btn btn-danger" to={link}>{linkText}</Link>}
            </div>
        )
    
}

export default PageLayout;