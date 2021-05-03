import React from 'react';
import { Button } from 'react-bootstrap';

import '../../Styles.css';

export const Layout = ({
    title = "Title",
    description = "Description",
    image = "http://arulselvan.net/wp-content/uploads/2014/03/work.png",
    button_link = "",
    button_content = "",
    align="",
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
                {button_content ? 
                <Button variant="dark" className={`float-${align}`} href={button_link}>{button_content}</Button>
                :
                null}
            </div>
            <div className="jumbotron-image col-md-7">
            </div>

            </div>
        </div>
        <div className={className}>{children}</div>
    </div>
    )


export const LayoutFluid = ({
    title = "Title",
    className,
    children
}) => (
    <div>
        <div className="jumbotron jumbotron-fluid">
            <div className="container ">
                <h2 style={{textTransform: 'capitalize'}}>{title}</h2>

            </div>
        </div>
        <div className={className}>{children}</div>
    </div>
    )

