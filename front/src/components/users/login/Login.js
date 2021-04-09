import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types"; 

import TextInputGroup from '../../layout/TextInputGroup';
import { waveAnimation } from "../../../utils/Utils";
import { loginUser } from "./LoginActions.js";

import '../Users.css';

class Login extends Component {
    state = {
        email : "",
        password : ""
    }


    componentDidMount = () => {
        waveAnimation();
    }

    logIn = async (e) => {
        e.preventDefault();

        const { email, password } = this.state;

        const userData = {
            email,
            password
        }
        console.log(userData);

        this.props.loginUser(userData, "/user/dashboard");

    }

    onChange = (e) => this.setState({[e.target.name]: e.target.value});


    

    
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


Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    auth: state.auth
  });
  
  export default connect(mapStateToProps, {
    loginUser
  })(withRouter(Login));