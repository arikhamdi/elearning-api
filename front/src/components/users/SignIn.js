import React, { Component } from 'react'
import axios from 'axios';

import TextInputGroup from '../layout/TextInputGroup';

import './Users.css';

export default class SignIn extends Component {
    state = {
        email : "",
        password : ""
    }


    componentDidMount = () => {
        this.waveAnimation();


    }

    logIn = async (e) => {
        e.preventDefault();
        console.log('test moi');

        const response = await axios.post("auth/login/", {
            "email":"student2@mail.com",
            "password": "testpass123"
        })

        console.log(response);

    }

    waveAnimation = () => {
        const labels = document.querySelectorAll('.user-sign-form-control label')

        labels.forEach(label => {
            label.innerHTML = label.innerText
                .split('')
                .map((letter, idx) => `<span style="transition-delay:${idx * 50}ms">${letter}</span>`)
                .join('')
        })
    }

    
    render() {

        const { email, password } = this.state;

        return (
            <div className="user-container">
            <h4>Connectez-vous à votre compte E-learning !</h4>
            
                <div className="user-sign">
                    
                    <form className="user-sign-form" onSubmit={this.logIn}>
                    <TextInputGroup
                        type="text"
                        name="email"
                        label="Email"
                        value={email}
                        onChange={this.onChange}
                        required="required"
                        />
                    <TextInputGroup
                        type="password"
                        name="password"
                        label="Password"
                        value={password}
                        onChange={this.onChange}
                        required="required"
                        />
                        <button className="btn">Se connecter</button>
                    </form>
                    
                </div>
            </div>
        )
    }
}
