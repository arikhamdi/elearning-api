import React from 'react'
import { Link } from 'react-router-dom';

import '../../pages/Page.css';

 const PasswordResetSuccess = () => {
        return (
            <div className="not-found">
            <h1 className="display-4"><span className="text-danger">Mot de passe</span> mis à jours</h1>
            <p className="lead">Vous allez être redirigé vers la page de <Link to="/login">connexion</Link></p>
                
            </div>
        )
    
}

export default PasswordResetSuccess;