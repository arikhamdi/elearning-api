import React from 'react'
import { Nav, Navbar, Dropdown } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const StudentMenu = ({title}) => {

    const { user, isAuthenticated } = useSelector(state => state.auth);

    const isActive = (active, e) => { 
        if (active)
            e.target.style.color = 'yellow';   
        else
            e.target.style.color = '';
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <NavLink 
        className="navbar-brand"
        style={{borderRight: "1px solid #ffffff", paddingRight: "2rem", color: "red"}} 
        to="/">
        E-leraning
        </NavLink>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
                <Navbar.Brand style={{textTransform: 'capitalize'}}>{title}</Navbar.Brand>
            </Nav>
            <Nav>
            <Dropdown alignRight>
                    <Dropdown.Toggle 
                        as={Nav.Link} 
                        onMouseEnter={isActive.bind(this,true)} 
                        onMouseLeave={isActive.bind(this,false)}
                    >
                    <i className="fas fa-user-graduate"></i>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="text-center">
                        {(user && user.first_name) && <Dropdown.Header>{`${user.first_name} ${user.last_name}`}</Dropdown.Header>}
                        <Dropdown.Header>{user && user.email}</Dropdown.Header>
                        <Dropdown.Divider />
                        <NavLink className="nav-link text-dark" to="/dashboard">Tableau de bord</NavLink>
                        <NavLink className="nav-link text-dark" to="/profile">Profile</NavLink>
                        <Dropdown.Divider />

                        </Dropdown.Menu>
                    </Dropdown>
            </Nav>
        </Navbar.Collapse>
        </Navbar>
    )
}

export default StudentMenu;
