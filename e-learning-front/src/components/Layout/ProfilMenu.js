import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const ProfilMenu = ({active}) => {

    return (
        <ul className="nav nav-fill nav-tabs mb-3">

        <li className="nav-item">
            <Link 
                className={"nav-link " + (active === 'infos' && 'active')} 
                to='/profile'
            >
            Profil
            </Link>
        </li>
        <li className="nav-item">
            <Link 
                className={"nav-link " + (active === 'auth' && 'active')} 
                to='/profile/auth'
            >
            Authentification
            </Link>
        </li>
  
    </ul>
    )
}

export default ProfilMenu
