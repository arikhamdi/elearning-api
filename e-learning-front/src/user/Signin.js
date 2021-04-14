import React, {useState}  from 'react';
import { Form, Button, Container, Spinner } from 'react-bootstrap';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { authenticateUser } from '../auth';
import './User.css';

import axios from 'axios';


const Signin = () => {

    const [values, setValues] = useState({
        email: 'student11@mail.com',
        password: 'testpass123',
        error: [],
        loading: false
    });

    const history = useHistory();

    const { email, password, error, loading} = values;

    const handleChange = name => e => {
        setValues({
            ...values,
            error:false,
            [name]: e.target.value
        });
    }

    const signin = user => {
        setValues({ ...values, error:[], loading:true});

        axios.post('/auth/login/', user)
        .then(response => {
            console.log(response);
            setValues({
                ...values,
                loading: true,
                success: true
            })
            authenticateUser(response.data, redirectUser);
            
        }).catch(error => {
            console.log(Object.entries(error.response.data))
            setValues({
                ...values,
                error: Object.entries(error.response.data),
                loading: false
            })
        } 

        );
    }

    const clickSubmit = (e) => {
        e.preventDefault();
        signin({email, password});
    }

    

    const signinForm = () => (
        <div className="user-container">
        <h4>Connectez-vous à votre compte E-learning !</h4>
            <div className="user-sign">
                <Form className="user-sign-form">
                <div className="user-sign-form-control">
                <Form.Control
                        type="email"
                        value={email} 
                        placeholder="Entrez un email"
                        required
                        onChange={handleChange('email')} 
                    />
                </div>
                
                <div className="user-sign-form-control">
                <Form.Control
                        type="password"
                        value={password}
                        placeholder="Mot de passe"
                        required
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
                    <Button variant="info"  onClick={clickSubmit}>Se connecter</Button>
                }
                </Form>
                
            </div>
        </div>
    );

    const showError = () => {
        if(error.length > 0) {
            return (
                error.map(err =>
                <div className="alert alert-danger" key={err[0]} >
                    {err[0] === 'email' && 'Email: ' + err[1] }
                    {err[0] === 'password' && 'Mot de passe: ' + err[1] }
                    {err[0] !== ('email' && 'password') && err[1] }         
                </div>
                )
            )
        }
    }


    const redirectUser = () => history.push("/dashboard");
        
    return (
        <Container>
            {showError()}
            {signinForm()}
        </Container>
        
    );
}

export default Signin;