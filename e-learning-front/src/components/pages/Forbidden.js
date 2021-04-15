import React, { Component } from 'react'

import './Page.css';

export default class Forbidden extends Component {

    render() {
        return (
            <div className="not-found">
            <h1 className="display-4"><span className="text-danger">403</span> Accès réservé</h1>
            <p className="lead">Seuls les étudiants inscrits à ce cours peuvent y accèder</p>
            </div>
        )
    }
}
