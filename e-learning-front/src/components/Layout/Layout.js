import React from 'react';

import '../../Styles.css';

const Layout = ({
    title = "Title",
    description = "Description",
    className,
    children
}) => (
    <div>
        <div className="jumbotron">
            <h2 style={{textTransform: 'capitalize'}}>{title}</h2>
            <p className="lead">{description}</p>
        </div>
        <div className={className}>{children}</div>
    </div>
    )

export default Layout;