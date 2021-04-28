import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Form, Button, Container, InputGroup, FormControl } from 'react-bootstrap';
import Layout from '../../Layout/Layout';
import { updatePassword } from '../../../reducers/user/UserActions';
import { showSuccess } from '../../../utils/Utils';
import ProfilMenu from '../../Layout/ProfilMenu';

export const PasswordChange = () => {

    const { user } = useSelector(state => state.auth);
    const { error, isUpdated } = useSelector(state => state.profile);
    const [validated, setValidated] = useState(false);

    const [values, setValues] = useState({
        email:'',
        new_password1: '',
        new_password2: '',
        errors : {}
    });



    useEffect(() => {
        if(user) {
            setValues({
                ...values,                
                email: user.email
            })
        }
  
        if(error) {
            setValues({
                ...values,                
                errors: error
            })
        }
    },[user, error, isUpdated])

    const {email, new_password1, new_password2, errors } = values;

    
    const dispatch = useDispatch();

    const handleChange = name => e => {
        setValues({
            ...values,
            errors: false,
            [name] : e.target.value
        })
    }

    const submitNewPassword = e => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
        }

        setValidated(true);
        dispatch(updatePassword({new_password1,new_password2})) 

    }

 
    const passwordChangeForm = () => (
            <div className="card mt-3">
            <h3 className="card-header mb-3">
            Informations d'authentification
             <i
             className="fas fa-user-lock"
             style={{
                 float: 'right',
                 color: 'black',
                 marginRight: '1rem'
             }}
             />
                    
            </h3>
            <Container>
            <Form noValidate onSubmit={submitNewPassword}>
            <Form.Group>
            <InputGroup>
                    <FormControl
                    type="email" 
                     size="lg" 
                     placeholder="Email"
                     value={email}  
                     onChange={handleChange('email')} 
                     readOnly
                    />
                    <InputGroup.Append>
                    <Button 
                    variant="outline-dark"
                    >
                    <i className="fas fa-pencil-alt"></i>
                    </Button>
                    </InputGroup.Append>
                </InputGroup>
             </Form.Group>
             <hr />
             <Form.Group>
                 <Form.Control 
                     type="password"
                     required 
                     size="lg" 
                     placeholder="Mot de passe"
                     value={new_password1}
                     onChange={handleChange('new_password1')} 
                     isInvalid={error && error.new_password1}
                 />
                 
             </Form.Group>
             <Form.Group>
                 <Form.Control 
                     type="password" 
                     size="lg" 
                     placeholder="Confirmer mot de passe"
                     required
                     value={new_password2} 
                     onChange={handleChange('new_password2')} 
                     isInvalid={error && error.new_password2}
                 />
                 <Form.Control.Feedback type="invalid">
                    {error&& error.new_password2}
                </Form.Control.Feedback>
             </Form.Group>

             <hr />
             <Form.Group className="text-center">
             <Button variant="info" className="w-50 mt-5" type="submit">Modifier mot de passe</Button>
             </Form.Group>
            </Form>
            </Container>
        </div>
     )

     return (
         <Layout
         title="Compte"
         description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pulvinar auctor dui at consequat."
         className="container"
         >
         <ProfilMenu active="auth" />
         {isUpdated && showSuccess('Mot de passe mis à jour')}
             {passwordChangeForm()}
         </Layout>
     )

 
}

export default PasswordChange;
