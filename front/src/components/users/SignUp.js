import React, { Component } from 'react'
import axios from 'axios';

import TextInputGroup from '../layout/TextInputGroup';

import './Users.css';

class SignUp extends Component {

    state = {
        email : '',
        password1 : '',
        password2 : ''
    };


    componentDidMount = () => {
        this.waveAnimation();
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

    SignUp = async (e) => {
        e.preventDefault();

        const { email, password1, password2 } = this.state;

        const newUser = {
            email,
            password1,
            password2
        }

        const response = await axios.post("auth/registration/", newUser);

        console.log(response)


    }

    onChange = (e) => this.setState({[e.target.name]: e.target.value})

    onNameChange = e => this.setState({email: e.target.value})
    
    render() {

        const { email, password1, password2 } = this.state;

        return (
            <div className="user-container">
            <h4>Inscrivez-vous et commencez à apprendre !</h4>
                <div className="user-sign">
                    <form className="user-sign-form" onSubmit={this.SignUp}>

                        <TextInputGroup
                        type="text"
                        name="email"
                        label="Email"
                        value={email}
                        onChange={this.onChange}
                        required={false}
                        />
                        <TextInputGroup
                        type="password"
                        name="password1"
                        label="Password"
                        value={password1}
                        onChange={this.onChange}
                        />
                        <TextInputGroup
                        type="password"
                        name="password2"
                        label="Password"
                        value={password2}
                        onChange={this.onChange}
                        />
                        <button className="btn">S'inscrire</button>
                    </form>
                    
                </div>
            </div>
        )
    }
}

export default SignUp ;