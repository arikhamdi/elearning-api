import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { Form, Button, Container, Spinner, FormControl} from 'react-bootstrap';
import { login } from '../../store/user/auth';
import { Link } from 'react-router-dom';


import './User.css';

const Login = ({history}) => {
    const [values, setValues] = useState({
        email : 'student1@mail.com',
        password : 'testpass123'
    });

    const [errors, setErrors] = useState({});

    const dispatch = useDispatch();

    const { isAuthenticated, error, loading } = useSelector(state => state.auth.auth);

        console.log(error)

    useEffect(() => {
        if (error) {
            setErrors({...error});
        }

        if (isAuthenticated) {
            history.push('/');
        }

    }, [dispatch, isAuthenticated, error])

    const { email, password} = values;

    const handleChange = name => e => {
        setValues({
            ...values,
            errors:false,
            [name]: e.target.value
        });
        setErrors({});
    }

    const submitHandler = (e) => {
        e.preventDefault();
        const userData = {
            email,
            password
        }
        dispatch(login(userData));
    }

    const signinForm = () => (
        <div className="user-container">
        <h4>Connectez-vous à votre compte E-learning !</h4>
            <div className="user-sign">
                <Form noValidate className="user-sign-form" onSubmit={submitHandler}>
                <div className="user-sign-form-control">
                <Form.Group>
                    <Form.Control
                            type="hidden"
                            isInvalid={error?.non_field_errors} 
                        />
                    <Form.Control.Feedback type="invalid">
                        {errors?.non_field_errors}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Form.Control
                            type="email"
                            value={email} 
                            placeholder="Entrez un email"
                            onChange={handleChange('email')} 
                            isInvalid={errors?.non_field_errors}
                        />
                    <Form.Control.Feedback type="invalid">
                        {errors?.non_field_errors}
                    </Form.Control.Feedback>
                    </Form.Group>
                </div>
                
                <div className="user-sign-form-control">
                <Form.Group>
                    <Form.Control
                            type="password"
                            value={password}
                            placeholder="Mot de passe"
                            onChange={handleChange('password')} 
                            isInvalid={errors && errors.password}
                        />
                    <Form.Control.Feedback type="invalid">
                        {errors && errors.password}
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
                    <Button variant="info" type="submit">Se connecter</Button>
                }
                </Form>
            
                    <p className="mt-2">
                    Vous n'avez pas encore de compte ? <Link to="/signup"> S'inscrire</Link>
                    </p>
                    <p className="mt-2">
                    Mot de passe oublié ?<Link to="/password-reset">Reinitialiser.</Link>
                    </p>
                
                
            </div>
        </div>
    );

    return (
        <div>
            <Container>
                {signinForm()}
            </Container>
        </div>
    )
}

export default Login
