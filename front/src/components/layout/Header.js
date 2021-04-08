import React from 'react';
import PropTypes from 'prop-types';

import { Navbar, Nav, NavDropdown, Form, Button, Row, Col } from 'react-bootstrap';
import { Consumer } from '../../context';


const Header = props => {
    const { branding, dropdown, login, signup } = props;


    return (
        <Navbar bg="info" expand="lg" className="mb-3">
        <Navbar.Brand href="/" >{branding}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            <NavDropdown title={dropdown} id="basic-nav-dropdown">
                <Consumer>
                {value => {
                    const {subjects} = value;
                    return(
                            subjects.map(subject => (
                            <NavDropdown.Item style={{textTransform: 'capitalize'}} key={subject.id} href={"/subject/"+subject.title.toLowerCase()}>{subject.title}</NavDropdown.Item>
                        ))
                    ) 
                }}
                </Consumer>
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
            <Button className="mr-sm-2" variant="outline-light" href="/user/login" >{login}</Button>
            <Button variant="dark" href="/user/signup" >{signup}</Button>
            </Nav>
        </Navbar.Collapse>
        </Navbar>
    )
}

Header.defaultProps = {
    branding: "E-learning",
    dropdown: "Categories",
    login: "Se connecter",
    signup : "S'inscrire",
    signout : "Déconnection" 
}

Header.propTypes = {
    branding: PropTypes.string.isRequired
}

export default Header;