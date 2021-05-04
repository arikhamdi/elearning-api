import React, {useState} from 'react'
import { Nav, Navbar, Dropdown } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutModal from './LogoutModal';

import {setActiveHandler, unSetActiveHandler} from '../../utils/Utils'

const TeacherMenu = () => {
    const [show, setShow] = useState(false);

    const { user } = useSelector(state => state.auth.auth);

    return (
        <Navbar className="bg-light justify-content-between" >
        <LogoutModal display={show}/>
        <Nav.Link 
            className="navbar-brand mb-0 h1" 
            href="/"
            onMouseEnter={setActiveHandler} 
            onMouseLeave={unSetActiveHandler}
            >
            <span style={{color:'red'}}>E</span>learning
        </Nav.Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
            </Nav>
            <Nav>
            <Nav.Link 
                    className="nav-link text-nowrap" 
                    href="/teacher/course" 
                    onMouseEnter={setActiveHandler} 
                    onMouseLeave={unSetActiveHandler}
                    >
                    
                    Tableau de bord
                </Nav.Link>
            <Dropdown alignRight>
                    <Dropdown.Toggle 
                        as={Nav.Link} 
                        onMouseEnter={setActiveHandler} 
                        onMouseLeave={unSetActiveHandler}
                        >
                    <i className="fas fa-user-graduate"></i>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="text-center">
                        {(user && user.first_name) && <Dropdown.Header>{`${user.first_name} ${user.last_name}`}</Dropdown.Header>}
                        <Dropdown.Header>{user && user.email}</Dropdown.Header>
                        <Dropdown.Divider />
                        <NavLink className="nav-link text-dark" to="/profile">Profile</NavLink>
                        <Dropdown.Divider />
                        <Nav.Link 
                            className="nav-link text-dark"
                            onClick={() => setShow(true)} >
                            <i className="fas fa-power-off"></i> Se déconnecter
                         </Nav.Link>
                        </Dropdown.Menu>
                    </Dropdown>
            </Nav>
        </Navbar.Collapse>
        </Navbar>
    )
}

export default TeacherMenu;
