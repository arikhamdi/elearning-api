import React, { useState } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { useSelector} from 'react-redux';
import { Navbar, Nav, Form, Button, Dropdown, InputGroup, FormControl } from 'react-bootstrap';
import ShowFavorisIcone from './menuFavoris';
import LogoutModal from './LogoutModal';
import {setActiveHandler, unSetActiveHandler} from '../../utils/Utils'
import '../../Styles.css';

const MainMenu = () => {

    const [show, setShow] = useState(false);

    const { user, isAuthenticated, isTeacher} = useSelector(state => state.auth.auth);
    const { subjects }  = useSelector(state => state.entities);

    return (
        <Navbar id="main-menu"  variant="light" expand="lg"   >
            <LogoutModal display={show}/>
        <Nav.Link 
            className="navbar-brand mb-0 h1" 
            href="/"
            onMouseEnter={setActiveHandler} 
            onMouseLeave={unSetActiveHandler} >
            <span style={{color:'red'}}>E</span>learning
        </Nav.Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-2">
                <Dropdown>
                <Dropdown.Toggle 
                        as={Nav.Link} 
                        onMouseEnter={setActiveHandler} 
                        onMouseLeave={unSetActiveHandler}
                    >
                    Categories
                    </Dropdown.Toggle>
                    <Dropdown.Menu  className="text-center">
                        {subjects.list.map(subject => (
                            <NavLink 
                            
                            className="nav-link text-dark" 
                            style={{textTransform: 'capitalize'}} 
                            key={subject.id}
                            to={"/subject/"+subject.title.toLowerCase()}
                            >
                            {subject.title}
                            </NavLink>        
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
                </Nav>
                <Nav className="mr-auto" style={{width: '100%'}}>
                <Form inline style={{width: '100%'}} >
 
                <InputGroup style={{width: '100%'}}>
                <InputGroup.Append>
                    <Button 
                    variant="bg-white"
                    onMouseEnter={setActiveHandler} 
                    onMouseLeave={unSetActiveHandler}
                    style={{borderColor: 'black',borderRadius : "50px 0 0 50px" , borderRightColor: 'white'}}><i className="fas fa-search"></i></Button>
                    </InputGroup.Append>
                    <FormControl
                    placeholder="Chercher un cours"
                    aria-label="Chercher un cours"
                    aria-describedby="Chercher un cours"
                    style={{borderRadius : "0 50px 50px 0" ,borderColor:"#000"}}
                    />
                </InputGroup>

                </Form>
                </Nav>

            <Nav className="ml-2 justify-content-end">
            {isAuthenticated ? (
                <React.Fragment>
                {isTeacher && 
                    <Nav.Link 
                    className="nav-link text-nowrap" 
                    href="/teacher/course" 
                    onMouseEnter={setActiveHandler} 
                    onMouseLeave={unSetActiveHandler}>
                    Formateur
                </Nav.Link>
                }
                <Nav.Link 
                    className="nav-link text-nowrap" 
                    href="/dashboard" 
                    onMouseEnter={setActiveHandler} 
                    onMouseLeave={unSetActiveHandler}>
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
                        <Nav.Link className="nav-link text-dark" href="/profile">Profile</Nav.Link>
                        <NavLink className="nav-link text-dark" to="/profile">link 1</NavLink>
                        <NavLink className="nav-link text-dark" to="/profile">link 2</NavLink>
                        <Dropdown.Divider />
                        <Nav.Link 
                            className="nav-link text-dark"
                            onClick={() => setShow(true)} >
                            <i className="fas fa-power-off"></i> Se déconnecter
                         </Nav.Link>
                        </Dropdown.Menu>
                    </Dropdown>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <ShowFavorisIcone />
                    <Button variant="outline-dark" className=" mr-sm-2 text-nowrap" href="/login"><i className="fas fa-sign-in-alt"></i> Se connecter</Button>
                    <Button variant="dark" className="mr-sm-2 text-nowrap" href="/signup"><i className="fas fa-user-plus"></i> S'inscrire</Button>
                </React.Fragment>
            )}
            </Nav>
        </Navbar.Collapse>
        </Navbar>
    )
}

export default withRouter(MainMenu)
