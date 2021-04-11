import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";

import { Navbar, Nav, NavDropdown, Form, Button, Row, Col } from 'react-bootstrap';

import { logout } from "../users/login/LoginActions";
import { getSubjects } from '../subjects/SubjectsAction';

class Header extends Component {

    componentDidMount = () => {
        this.props.getSubjects();
    }
    
    onLogout = () => {
        this.props.logout();
        // this.props.history.push('/');
      };

      
    render () {
        return (         
            <Navbar bg="info" expand="lg" className="mb-3">
            <Navbar.Brand href="/" >E-learning</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <NavDropdown title="Categories" id="basic-nav-dropdown">

                {this.props.subjects.map(subject => (
                <NavDropdown.Item style={{textTransform: 'capitalize'}} key={subject.id} href={"/subject/"+subject.title.toLowerCase()}>{subject.title}</NavDropdown.Item>
                ))}
 
                </NavDropdown>
                </Nav>
       
                <Form className="w-50">
                <Row>
    
                <Col>
                <Form.Control type="text" placeholder="Search" className="mr-2 w-100" />
                </Col>
                <Col>
                <Button variant="outline-light">Search</Button>
                </Col>
                </Row>
                </Form>
            
                <Nav className="justify-content-end">
                {this.props.auth.isAuthenticated ? (
                    <>
                    <Button className="mr-sm-2" variant="outline-light" href="/user/dashboard" >Mon compte</Button>
                    <Button variant="dark" href="#!" onClick={this.onLogout} >Déconnection</Button>
                    </>
                    
                ) : (
                    <>
                        <Button className="mr-sm-2" variant="outline-light" href="/user/login" >Se connecter</Button>
                        <Button variant="dark" href="/user/signup" >S'inscrire</Button>
                    </>
                )}
                
                </Nav>
            </Navbar.Collapse>
            </Navbar>
        )
    }
}

Header.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    getSubjects: PropTypes.func.isRequired,
    subjects : PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    subjects: state.subjects.subjects
  });

export default connect(mapStateToProps, {
logout,
getSubjects
})(Header);