import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Form, Button, Container  } from 'react-bootstrap';
import {Layout} from '../Layout/Layout';
import { updateProfile } from '../../store/user/profile';
import ProfilMenu from '../menu/ProfilMenu';

const UserPersonalInfos = () => {

    const { user } = useSelector(state => state.auth.auth);
    const { error } = useSelector(state => state.auth.profile);


    const [errors, setErrors] = useState({});
    const [values, setValues] = useState({
        first_name: '',
        last_name: '',
        email: ''
    });


    const {first_name, last_name, email} = values;

    
    const dispatch = useDispatch();

    useEffect(() => {
        if (error) {
            setErrors({...error});
        }

        if(user) {
            setValues({
                ...values,                
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email
            })
        }

    },[user, error])

    const handleChange = name => e => {
        setValues({
            ...values,
            [name] : e.target.value
        });
        setErrors({});
    }

    const submitProfileForm = e => {
        e.preventDefault();
        dispatch(updateProfile({first_name, last_name, email}));
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
                        isInvalid={errors?.first_name} 
                    />
                    <Form.Control.Feedback type="invalid">
                    {errors?.first_name}
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
                        isInvalid={errors?.last_name} 
                    />
                    <Form.Control.Feedback type="invalid">
                    {errors?.last_name}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-5">
                    <Form.Control type="text"  size="lg" value={email} readOnly />
                </Form.Group>
                <hr />
                <Form.Group className="text-center">
                <Button variant="dark" className="w-50 mt-5" type="submit">Sauvegarder</Button>
                </Form.Group>
               

               </Form>
               </Container>
           </div>
        )

        return (
            <Layout
            title="Profil"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pulvinar auctor dui at consequat."
            image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimage.flaticon.com%2Ficons%2Fpng%2F512%2F16%2F16363.png&f=1&nofb=1"
            className="container">

            <ProfilMenu active="infos" />
                {userInfoForm()}
            </Layout>
        )
}

export default UserPersonalInfos;