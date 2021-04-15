import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Tab, Tabs,Form, Button, Container, InputGroup, FormControl, Navbar  } from 'react-bootstrap';
import Layout from '../Layout/Layout';
import { updateProfile, clearErrors } from '../../reducers/user/UserActions';
import ProfilMenu from '../Layout/ProfilMenu';

const UserPersonalInfos = () => {

    const { user } = useSelector(state => state.auth);
    const { error, isUpdated } = useSelector(state => state.profile);

    const [values, setValues] = useState({
        first_name: '',
        last_name: '',
        email: '',
        errors : {}
    });

    const [validated, setValidated] = useState(false);

    const {first_name, last_name, email, errors } = values;

    
    const dispatch = useDispatch();

    useEffect(() => {
        if(user) {
            setValues({
                ...values,                
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email
            })
        }

        if(error) {
            setValues({
                ...values,                
                errors: error
            })
            console.log(error);
        }

    },[user, error, isUpdated])

    const handleChange = name => e => {
        setValues({
            ...values,
            [name] : e.target.value,
            errors: {}
        })
    }

    const submitProfileForm = e => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }

        setValidated(true);
        dispatch(updateProfile({first_name, last_name, email}));
        // dispatch(clearErrors());
    }


    const userInfoForm = () => (
               <div className="card mt-3">               
               <h3 className="card-header mb-3">
               Informations personnelles
               
                <i
                className="fas fa-user"
                style={{
                    float: 'right',
                    color: 'black',
                    marginRight: '1rem'
                }}
                />
                       
               </h3>
               <Container>
               <Form noValidate onSubmit={submitProfileForm}>
               <Form.Group controlId="first_name">
                    <Form.Control 
                        type="text" 
                        size="lg" 
                        placeholder="Prénom"
                        value={first_name} 
                        required 
                        onChange={handleChange('first_name')}
                        isInvalid={errors.first_name} 
                    />
                    <Form.Control.Feedback type="invalid">
                    {errors.first_name && errors.first_name}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Form.Control 
                        type="text" 
                        size="lg" 
                        placeholder="Nom" 
                        onChange={handleChange('last_name')} 
                        required
                        value={last_name}
                        isInvalid={errors.last_name} 
                    />
                    <Form.Control.Feedback type="invalid">
                    {errors.last_name && errors.last_name}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-5">
                    <Form.Control type="text"  size="lg" value={email} readOnly />
                </Form.Group>
                <hr />
                <Form.Group className="text-center">
                <Button variant="info" className="w-50 mt-5" type="submit">Sauvegarder</Button>
                </Form.Group>
               

               </Form>
               </Container>
           </div>
        )

        return (
            <Layout
            title="Profil"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pulvinar auctor dui at consequat."
            className="container">

            <ProfilMenu active="infos" />
                {userInfoForm()}
            </Layout>
        )
}

export default UserPersonalInfos;