import React, { useState, useEffect } from 'react'
import { Form, InputGroup, FormControl, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../../reducers/user/UserActions';

import '../pages/Page.css';

const PasswordReset = () => {

    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState('');

    const {error, isUpdate, loading} = useSelector(state => state.profile)

    const dispatch = useDispatch();

    const submitEmail = (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
        }
        console.log({email})
        dispatch(resetPassword({email}));
    }

    useEffect(() => {
        if(error) {
            setErrors(error)
        }
        console.log('error', error)
    }, [error])

    

    return (
        <div>
            <div className="not-found" style={{ height: '60vh'}}>
            <h1 className="display-4"><span className="text-danger">Reinitialiser</span> votre mot de passe</h1>
            <Form className="w-50" noValidate onSubmit={submitEmail}>
            
            <InputGroup >
                    <FormControl
                    type="email" 
                    size="lg"
                    value={email}
                    placeholder="Entrez votre Email..."
                    onChange={(e) => setEmail(e.target.value)}
                    isInvalid={error && error.email}
                    />

                    <InputGroup.Append>
                    <Button 
                    variant="outline-dark"
                    type="submit"
                    >
                    <i className="fas fa-envelope"></i>
                    </Button>
                    </InputGroup.Append>
                    <Form.Control.Feedback type="invalid">
                    {error && error.email}
                    </Form.Control.Feedback>
                </InputGroup>

                
                <Form.Text className="text-muted">
                Vous avez oublié votre mot de passe ? Cliquer sur envoyer pour le reinitialiser par e-mail
                </Form.Text>
            </Form>
            </div>
        </div>
    )
}

export default PasswordReset
