import React, { Component } from 'react'
import axios from 'axios';

import TextInputGroup from '../layout/TextInputGroup';

import './Users.css';

export default class logIn extends Component {
    state = {
        email : "",
        password : ""
    }


    componentDidMount = () => {
        this.waveAnimation();
    }

    logIn = async (e) => {
        e.preventDefault();

        const { email, password } = this.state;

        const user = {
            email,
            password
        }

        const response = await axios.post("auth/login/", user)

        console.log(response);

    }

    onChange = (e) => this.setState({[e.target.name]: e.target.value});

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
