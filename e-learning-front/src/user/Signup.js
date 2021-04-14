import React, {useState} from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import axios from 'axios';

import './User.css';


const Signup = () => {
    const [values, setValues] = useState({
        email: '',
        password1: '',
        password2: '',
        error: [],
        success: false
    });
 


    const { email, password1, password2, error, success } = values;

    const handleChange = name => e => {
        setValues({
            ...values,
            error: false,
            [name]: e.target.value
        });
    }



    const signup = user => {

        axios.post(`/auth/registration/`, user)
        .then(response => {
            setValues({
                ...values,
                email: '',
                password1: '',
                password2: '',
                error: [],
                success: true
            });
        })
        .catch(error => {
            console.log(Object.entries(error.response.data))
            setValues({
                ...values,
                error: Object.entries(error.response.data),
                success: false
            })
        })
    }



    const clickSubmit = (e) => {
        e.preventDefault();
        signup({email, password1, password2});
    }

    const signUpForm = () => (
        <div className="user-container">
        <h4>Inscrivez-vous et commencez à apprendre !</h4>
            <div className="user-sign">
                <Form className="user-sign-form">
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
                        value={password1}
                        placeholder="Mot de passe"
                        onChange={handleChange('password1')} 

                    />
                </div>
                
                <div className="user-sign-form-control">
                <Form.Control
                        type="password"
                        value={password2}
                        placeholder="Confirmez mot de passe" 
                        onChange={handleChange('password2')} 
                    />
                </div>
                <Button variant="info"  onClick={clickSubmit}>S'inscrire</Button>
                </Form>

                <p className="mt-2">
                Vous avez déjà un compte ? <Link to="/signin">Se connecter</Link>
                </p>
                
            </div>
        </div>
    );

    const showError = () => {
        if(error.length > 0) {
            return (
                error.map(err =>
                <div className="alert alert-danger" key={err[0]} >
                    {err[0] === 'email' && 'Email: ' + err[1]}
                    {err[0] === 'password1' && 'Mot de passe: ' + err[1]}
                    {err[0] === 'password2' && 'Confrmer mot de passe: ' + err[1]}
                    {err[0] !== ('email' && 'password1' && 'password2') && err[1] }           
                </div>
                )
            )
        }
    }

    const showSuccess = () => (
        <div className="alert alert-success" style={{display: success ? '' : 'none'}}>
            Félicitations! Votre compte a été créé avec succès. <Link to="/signin">Connectez-vous</Link>
        </div>
    )

    return (
        <Container>
            {showSuccess()}
            {showError()}
            {signUpForm()}
        </Container>
        
    );
}

export default Signup;