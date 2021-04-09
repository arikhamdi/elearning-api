import React, { Component } from 'react'

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import TextInputGroup from '../../layout/TextInputGroup';
import { waveAnimation } from "../../../utils/Utils";

import { signupNewUser } from "./SignupActions";

import '../Users.css';
import { Link } from 'react-router-dom';

class Signup extends Component {

    state = {
        email : '',
        password1 : '',
        password2 : ''
    };


    componentDidMount = () => {
        waveAnimation();
    }


    SignUp = async (e) => {
        e.preventDefault();

        const { email, password1, password2 } = this.state;

        const userData  = {
            email,
            password1,
            password2
        }

        this.props.signupNewUser(userData);

    }

    onChange = (e) => this.setState({[e.target.name]: e.target.value});
    
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
                        required="required"
                        />
                        <TextInputGroup
                        type="password"
                        name="password1"
                        label="Mot de passe"
                        value={password1}
                        onChange={this.onChange}
                        required="required"
                        />
                        <TextInputGroup
                        type="password"
                        name="password2"
                        label="Confirmez mot de passe"
                        value={password2}
                        onChange={this.onChange}
                        required="required"
                        />
                        <button className="btn">S'inscrire</button>
                    </form>
                    <p className="mt-2">
                    Vous avez déjà un compte ? <Link to="/user/login">Se connecter</Link>
                    </p>
                    
                </div>
            </div>
        );
    }
}

Signup.propTypes = {
    signupNewUser: PropTypes.func.isRequired,
    createUser: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    createUser: state.createUser
});

export default connect(mapStateToProps, {
    signupNewUser
  })(withRouter(Signup));