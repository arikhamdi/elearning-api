import React, { useState, useEffect } from 'react'
import { Form, InputGroup, FormControl, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../../../store/user/profile';

import '../../pages/Page.css';

const PasswordReset = () => {

    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState('');

    const {error} = useSelector(state => state.auth.profile)

    const dispatch = useDispatch();

    const submitEmail = (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
        }
        dispatch(resetPassword({email}));
    }

    useEffect(() => {
        if(error) {
            setErrors(error)
        }
    }, [error])

    const handleChange = e => {
        setEmail(e);
        setErrors({});
    }

    

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
                    onChange={(e) => handleChange(e.target.value)}
                    isInvalid={errors?.email}
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
                    {errors?.email}
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
