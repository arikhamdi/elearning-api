import React, { Component } from 'react'

import './Page.css';

export default class NotFound extends Component {
    render() {
        return (
            <div className="not-found">
            <h1 className="display-4"><span className="text-danger">404</span> Page Not Found</h1>
            <p className="lead">Sorry, that page does not exist</p>
                
            </div>
        )
    }
}
