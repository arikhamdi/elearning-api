import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Tab, Tabs,Form, Button, Container, InputGroup, FormControl, Navbar, Nav  } from 'react-bootstrap';
import Layout from '../Layout/Layout';
import { updateProfile, updatePassword } from '../../reducers/user/UserActions';
import { showError } from '../../utils/Utils';
import { Link, NavLink, Redirect } from 'react-router-dom';
import {UserPersonalInfos} from './UserPersonalInfos';
import {PasswordChange} from './PasswordChange';

const Profile = ({match}) => {

    // const { user } = useSelector(state => state.auth);
    // const { error, isUpdated } = useSelector(state => state.profile);

    // const [values, setValues] = useState({
    //     first_name: '',
    //     last_name: '',
    //     email: '',
    //     new_password1: '',
    //     new_password2: '',
    //     old_password: '',
    //     errors : []
    // });

    // const {first_name, last_name, email, new_password1, new_password2, old_password, errors } = values;

    
    // const dispatch = useDispatch();

    const [form, setForm] = useState('info')

    useEffect(() => {
        console.log(active)
        getForm(active);
    },[match])

    const getForm = (form) => {
        
    }

    // const handleChange = name => e => {
    //     setValues({
    //         ...values,
    //         errors: false,
    //         [name] : e.target.value
    //     })
    // }

    // const submitProfileForm = e => {
    //     e.preventDefault();
    //     dispatch(updateProfile({first_name, last_name, email}));
    // }


    // const profilUpdateForm = () => {
    //     return (
    //            <div className="card mt-3">
    //            <h3 className="card-header mb-3">
    //            Informations personnelles
               
    //             <i
    //             className="fas fa-user"
    //             style={{
    //                 float: 'right',
    //                 color: 'black',
    //                 marginRight: '1rem'
    //             }}
    //             />
                       
    //            </h3>
    //            <Container>
    //            <Form onSubmit={submitProfileForm}>
    //            <Form.Group>
    //                 <Form.Control 
    //                     type="text" 
    //                     size="lg" 
    //                     placeholder="Prénom"
    //                     value={first_name}  
    //                     onChange={handleChange('first_name')} 
    //                 />
    //             </Form.Group>
    //             <Form.Group>
    //                 <Form.Control 
    //                     type="text" 
    //                     size="lg" 
    //                     placeholder="Nom" 
    //                     onChange={handleChange('last_name')} 
    //                     value={last_name} 
    //                 />
    //             </Form.Group>
    //             <Form.Group className="mb-5">
    //                 <Form.Control type="text"  size="lg" value={user.email} readOnly />
    //             </Form.Group>
    //             <hr />
    //             <Form.Group className="text-center">
    //             <Button variant="info" className="w-50 mt-5" type="submit">Sauvegarder</Button>
    //             </Form.Group>
               

    //            </Form>
    //            </Container>
    //        </div>
    //     )
    // }

    // const submitPasswordAndEmailForm = e => {
    //     e.preventDefault();
    //     dispatch(updatePassword({new_password1,new_password2, old_password}))
    // }

    // const passwordAndEmailUpdateForm = () => {
    //     return (
    //         <div className="card mt-3">
    //         <h3 className="card-header mb-3">
    //         Informations d'authentification
    //          <i
    //          className="fas fa-user-lock"
    //          style={{
    //              float: 'right',
    //              color: 'black',
    //              marginRight: '1rem'
    //          }}
    //          />
                    
    //         </h3>
    //         <Container>
    //         <Form onSubmit={submitPasswordAndEmailForm}>
    //         <Form.Group>
    //         <InputGroup>
    //                 <FormControl
    //                 type="email" 
    //                  size="lg" 
    //                  placeholder="Email"
    //                  value={email}  
    //                  onChange={handleChange('email')} 
    //                  readOnly
    //                 />
    //                 <InputGroup.Append>
    //                 <Button 
    //                 variant="outline-dark"
    //                 >
    //                 <i className="fas fa-pencil-alt"></i>
    //                 </Button>
    //                 </InputGroup.Append>
    //             </InputGroup>
    //          </Form.Group>
    //          <hr />
    //          <Form.Group>
    //              <Form.Control 
    //                  type="password" 
    //                  size="lg" 
    //                  placeholder="Mot de passe"
    //                  value={new_password1}
    //                  onChange={handleChange('new_password1')} 
    //              />
    //          </Form.Group>
    //          <Form.Group>
    //              <Form.Control 
    //                  type="password" 
    //                  size="lg" 
    //                  placeholder="Confirmer mot de passe"
    //                  value={new_password2} 
    //                  onChange={handleChange('new_password2')} 
    //              />
    //          </Form.Group>
    //          <Form.Group>
    //              <Form.Control 
    //                  type="password" 
    //                  size="lg" 
    //                  placeholder="Ancien mot de passe"
    //                  value={old_password}
    //                  onChange={handleChange('old_password')}
    //              />
    //          </Form.Group>

    //          <hr />
    //          <Form.Group className="text-center">
    //          <Button variant="info" className="w-50 mt-5" type="submit">Modifier mot de passe</Button>
    //          </Form.Group>
    //         </Form>
    //         </Container>
    //     </div>
    //  )
    // }

    // const errorsRender = (err) => {
    //     if (err[0] == 'first_name') {
    //         return 'Prénom: ' + err[1];
    //     } else if (err[0] == 'last_name') {
    //         return 'Nom: ' + err[1];
    //     }else {
    //         return err[1];
    //     }
    // }

    // const showError = () => {
    //     if(errors.length > 0) {
    //         return (
    //             errors.map(err => {
    //                 return (
    //                     <div className="alert alert-danger" key={err[0]} >
    //                         {errorsRender(err)}
    //                     </div>
    //                 )

    //             }
    //             )
    //         )
    //     }
    // }

    const [active, setActive] = useState('infos');

    return (
        <Layout title="Profil" 
                description="Informations personnelles"
                className="container">

                {/* {showError(errors)} */}
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

                {/* <Nav fill variant='tabs'>
                        <Nav.item >
                            <Link  to='/profile/infos'>Profil</Link>
                        </Nav.item>
                        <Nav.item>
                            <Link to='/profile/auth' >Authentification</Link>
                        </Nav.item>
                </Nav> */}


                {/* {active === 'infos' ? (  UserPersonalInfos()) : ( PasswordChange()) } */}
                {/* {active === 'auth' && ( PasswordChange())} */}
        </Layout>
    )
}

export default Profile;