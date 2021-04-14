import React from 'react';
import {useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import Layout from '../Layout/Layout';

const Profile = () => {

    const { user } = useSelector(state => state.auth);


    const userInfo = () => {
        return (
               <div className="card mt-3">
               <h3 className="card-header">
               Informations personnelles
               <Link to='#'>
                           <i
                           className="fas fa-pencil-alt"
                           style={{
                               cursor: 'pointer',
                               float: 'right',
                               color: 'black',
                               marginRight: '1rem'
                           }}
                           />
                       </Link>
               </h3>
               <ul className="list-group">
                   <li className="list-group-item">Prénom: {user.first_name}</li>
                   <li className="list-group-item">Nom: {user.last_name}</li>
                   <li className="list-group-item">Email: {user.email}</li>
               </ul>
           </div>
        )
    }
    return (
        <Layout title="Profile" 
                description="Informations personnelles"

                className="container">
            {user && userInfo()}
        </Layout>
    )
}

export default Profile;