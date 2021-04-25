import React from 'react';

import '../../Styles.css';

const Layout = ({
    title = "Title",
    description = "Description",
    image = "http://arulselvan.net/wp-content/uploads/2014/03/work.png",
    className,
    children
}) => (
    <div className="container">
        <div className="jumbotron jumbotron-fluid"
                style={{backgroundImage: `url(${image})`}}>
            <div className="container row ">
            <div className="jumbotron-post col-md-5">
                <h2 style={{textTransform: 'capitalize'}}>{title}</h2>
                <p className="lead">{description}</p>
            </div>
            <div className="jumbotron-image col-md-7">
            </div>

            </div>
        </div>
        <div className={className}>{children}</div>
    </div>
    )

export default Layout;