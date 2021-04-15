import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { Form, Button, Container, Spinner} from 'react-bootstrap';
import { login } from '../../reducers/user/UserActions';
import { Link } from 'react-router-dom';


import './User.css';

const Login = ({history}) => {
    const [values, setValues] = useState({
        email : 'student1@mail.com',
        password : 'testpass123',
        errors: []
    });

    const { email, password, errors} = values;

    const dispatch = useDispatch();

    const { isAuthenticated, error, loading } = useSelector(state => state.auth);


    useEffect(() => {
        if (error) {
            setValues( {
                ...values,
                errors: Object.entries(error)
            })
        }

    }, [dispatch, isAuthenticated, error])

    const handleChange = name => e => {
        setValues({
            ...values,
            errors:false,
            [name]: e.target.value
        });
    }


    const signinForm = () => (
        <div className="user-container">
        <h4>Connectez-vous à votre compte E-learning !</h4>
            <div className="user-sign">
                <Form className="user-sign-form" onSubmit={submitHandler}>
                <div className="user-sign-form-control">
                <Form.Control
                        type="email"
                        value={email} 
                        placeholder="Entrez un email"
                        onChange={handleChange('email')} 
                    />
                </div>
                
                <div className="user-sign-form-control">
                <Form.Control
                        type="password"
                        value={password}
                        placeholder="Mot de passe"
                        onChange={handleChange('password')} 
                    />
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
                    Mot de passe oublié ?<Link to="/reset-password">Reinitialiser.</Link>
                    </p>
                
                
            </div>
        </div>
    );

    

    const submitHandler = (e) => {
        e.preventDefault();
        const userData = {
            email,
            password
        }
        dispatch(login(userData, () => history.push("/dashboard")));
    }

    const showError = () => {
        if(errors.length > 0) {
            return (
                errors.map(err =>
                <div className="alert alert-danger" key={err[0]} >
                    {err[0] === 'email' && 'Email: ' + err[1] }
                    {err[0] === 'password' && 'Mot de passe: ' + err[1] }
                    {err[0] !== ('email' && 'password') && err[1] }         
                </div>
                )
            )
        }
    }

    return (
        <div>
            <Container>
            {showError()}
            {signinForm()}
            {JSON.stringify(values)}
        </Container>
        </div>
    )
}

export default Login
