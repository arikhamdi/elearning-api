import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { Form, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { signup } from '../../reducers/user/UserActions';

import './User.css';

const Signup = () => {
    const [values, setValues] = useState({
        email : '',
        password1 : '',
        password2 : '',
        errors: []
    });

    const { email, password1, password2, errors} = values;

    const dispatch = useDispatch();

    const { isAuthenticated, error, loading } = useSelector(state => state.auth);

    useEffect(() => {

 
        if (error) {
            setValues( {
                ...values,
                errors: Object.entries(error)
            })
            console.log(errors)
        }

    }, [dispatch, isAuthenticated, error])

    const handleChange = name => e => {
        setValues({
            ...values,
            errors: false,
            [name]: e.target.value
        });
    }


    const submitHandler = (e) => {
        e.preventDefault();
        const userData = {
            email,
            password1,
            password2
        }
        dispatch(signup(userData));
    }

    const signUpForm = () => (
        <div className="user-container">
        <h4>Inscrivez-vous et commencez à apprendre !</h4>
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
                <Button variant="info" type="submit">S'inscrire</Button>
                </Form>

                <p className="mt-2">
                Vous avez déjà un compte ? <Link to="/signin">Se connecter</Link>
                </p>
                
            </div>
        </div>
    );

    const showError = () => {
        if(errors.length > 0) {
            return (
                errors.map(err =>
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
    return (
        <div>
            <Container>
            {showError()}
            {signUpForm()}
        </Container>
        </div>
    )
}

export default Signup
