import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { Form, Button, Container, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './User.css';
import { registration } from '../../store/user/auth';

const Signup = ({history}) => {
    const [values, setValues] = useState({
        email : 'student211@mail.com',
        password1 : 'testpass123',
        password2 : 'testpass123'
    });
    const [errors, setErrors] = useState({});

    const { email, password1, password2 } = values;

    const dispatch = useDispatch();

    const { isRegistered, error, loading } = useSelector(state => state.auth.auth);

    useEffect(() => {
        if (error) {
            setErrors({...error});
        }
        if (isRegistered) {
            history.push('/registration-success');
        }
    }, [dispatch, isRegistered, error])

    const handleChange = name => e => {
        setValues({
            ...values,
            [name]: e.target.value
        });
        setErrors({});
    }


    const submitHandler = (e) => {
        e.preventDefault();
        const userData = {
            email,
            password1,
            password2
        }
        dispatch(registration(userData));
    }

    const signUpForm = () => (
        <div className="user-container">
        <h4>Inscrivez-vous et commencez à apprendre !</h4>
            <div className="user-sign">
                <Form noValidate className="user-sign-form" onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Control
                            type="hidden"
                            isInvalid={error && error.non_field_errors} 
                        />
                    <Form.Control.Feedback type="invalid">
                        {errors && errors.non_field_errors}
                    </Form.Control.Feedback>
                </Form.Group>
                <div className="user-sign-form-control">
                <Form.Group>
                    <Form.Control
                            type="email"
                            value={email} 
                            placeholder="Entrez un email"
                            onChange={handleChange('email')} 
                            isInvalid={errors && errors.email}
                        />
                    <Form.Control.Feedback type="invalid">
                        {errors && errors.email}
                    </Form.Control.Feedback>
                </Form.Group>
                </div>
                
                <div className="user-sign-form-control">
                <Form.Group>
                    <Form.Control
                            type="password"
                            value={password1}
                            placeholder="Mot de passe"
                            onChange={handleChange('password1')} 
                            isInvalid={errors && errors.password1}
                        />
                        <Form.Control.Feedback type="invalid">
                        {errors && errors.password1}
                    </Form.Control.Feedback>
                </Form.Group>
                </div>
                
                <div className="user-sign-form-control">
                <Form.Group>
                    <Form.Control
                            type="password"
                            value={password2}
                            placeholder="Confirmez mot de passe" 
                            onChange={handleChange('password2')}
                            isInvalid={errors && errors.password2} 
                        />
                    <Form.Control.Feedback type="invalid">
                        {errors && errors.password2}
                    </Form.Control.Feedback>
                </Form.Group>
                </div>
                {loading ? (
                    <Button variant="info" disabled>
                        <Spinner
                        as="span"
                        animation="grow"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        />
                        Loading...
                    </Button>
                    ) 
                    : 
                <Button variant="info" type="submit">S'inscrire</Button>
                }
                </Form>

                <p className="mt-2">
                Vous avez déjà un compte ? <Link to="/login">Se connecter</Link>
                </p>
                
            </div>
        </div>
    );

    return (
        <div>
            <Container>
                {signUpForm()}

            </Container>
        </div>
    )
}

export default Signup


