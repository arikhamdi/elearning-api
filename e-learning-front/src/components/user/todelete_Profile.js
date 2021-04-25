import React, { useEffect, useState } from 'react';
import Layout from '../Layout/Layout';
import { Link } from 'react-router-dom';
const Profile = ({match}) => {


    const [form, setForm] = useState('info')

    useEffect(() => {
        console.log(active)
        getForm(active);
    },[match])

    const getForm = (form) => {
        
    }

    const [active, setActive] = useState('infos');

    return (
        <Layout title="Profil" 
                description="Informations personnelles"
                image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.Otk3-KY2jKkRC7-iX7z1fwHaHa%26pid%3DApi&f=1"
                className="container">

                <ul className="nav nav-fill nav-tabs mb-3">

                <li className="nav-item">
                    <Link 
                        className={"nav-link " + (active === 'infos' && 'active')} 
                        to='/profile/infos'
                        onClick={() => setActive('infos')}
                    >
                    Profil
                    </Link>
                </li>
                <li className="nav-item">
                    <Link 
                        className={"nav-link " + (active === 'auth' && 'active')} 
                        to='/profile/auth'
                        onClick={() => setActive('auth')}
                    >
                    Authentification
                    </Link>
                </li>
          
            </ul>

        </Layout>
    )
}

export default Profile;