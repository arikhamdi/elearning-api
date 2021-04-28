import React from 'react'
import { Link } from 'react-router-dom';

import './Page.css';

const registrationSuccess = () => {

        return (
            <div className="not-found">
            <h1 className="display-4"><span className="text-danger">Votre </span> Compte</h1>
            <p className="lead">à été créé</p>
            <Link to="/login">Login</Link>
            </div>
        )
    
}

export default registrationSuccess;