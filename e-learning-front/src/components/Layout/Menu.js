import React, { Fragment, useEffect } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import {logout} from '../../reducers/user/UserActions';
import { getCourses, getSubjects } from '../../reducers/course/CourseActions';

import { Navbar, Nav, Form, Button, Dropdown, InputGroup, FormControl } from 'react-bootstrap';

import '../../Styles.css';

const Menu = ({ history }) => {
    const dispatch = useDispatch();

    const { user, isAuthenticated } = useSelector(state => state.auth);
    const { subjects}  = useSelector(state => state.subjects);



    useEffect(() => {
        dispatch(getSubjects());
    }, [dispatch])


    const isActive = (active, e) => { 
        if (active)
            e.target.style.color = 'yellow';   
        else
            e.target.style.color = '';
    }

    const filterCourse = (subject) => {
        dispatch(getCourses(`/subject/${subject}`))

    }

    const mainMenu = () => (
                <Navbar id="main-menu" bg="info" variant="dark" expand="lg" className="mb-3"  >
        <Nav.Link 
            className="navbar-brand mb-0 h1" 
            href="/"
            onMouseEnter={isActive.bind(this,true)} 
            onMouseLeave={isActive.bind(this,false)} >
            E-learning
        </Nav.Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-2">
                <Dropdown>
                <Dropdown.Toggle 
                        as={Nav.Link} 
                        onMouseEnter={isActive.bind(this,true)} 
                        onMouseLeave={isActive.bind(this,false)}
                    >
                    Categories
                    </Dropdown.Toggle>
                    <Dropdown.Menu  className="text-center">
                        {subjects && subjects.map(subject => (
                            <NavLink 
                            
                            className="nav-link text-dark" 
                            style={{textTransform: 'capitalize'}} 
                            key={subject.id} 
                            onClick={() => filterCourse(subject.slug)}
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
 
                <InputGroup style={{width: '100%', borderRadius : "50px"}}>
                    <FormControl
                    placeholder="Chercher un cours"
                    aria-label="Chercher un cours"
                    aria-describedby="Chercher un cours"
                    style={{borderRadius : "50px 0 0 50px"}}
                    />
                    <InputGroup.Append>
                    <Button 
                    variant="outline-light"
                    style={{borderRadius : "0 50px 50px 0"}}><i className="fas fa-search"></i></Button>
                    </InputGroup.Append>
                </InputGroup>

                </Form>
                </Nav>

            <Nav className="ml-2 justify-content-end">
            {isAuthenticated ? (
                <React.Fragment>
                <NavLink 
                    className="nav-link text-nowrap" 
                    to="/dashboard" 
                    onMouseEnter={isActive.bind(this,true)} 
                    onMouseLeave={isActive.bind(this,false)}>
                    Tableau de bord
                </NavLink>
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
                        <NavLink className="nav-link text-dark" to="/profile">Profile</NavLink>
                        <NavLink className="nav-link text-dark" to="/profile">link 1</NavLink>
                        <NavLink className="nav-link text-dark" to="/profile">link 2</NavLink>
                        <Dropdown.Divider />
                        <Nav.Link 
                            className="nav-link text-dark"
                            onClick={() => dispatch(logout(() => history.push("/")))} >
                            <i className="fas fa-power-off"></i> Se déconnecter
                         </Nav.Link>
                        </Dropdown.Menu>
                    </Dropdown>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <NavLink className="btn btn-outline-light mr-sm-2 text-nowrap" to="/login"><i className="fas fa-sign-in-alt"></i> Se connecter</NavLink>
                    <NavLink className="btn btn-dark mr-sm-2 text-nowrap"  to="/signup"><i className="fas fa-user-plus"></i> S'inscrire</NavLink>
                </React.Fragment>
            )}
            </Nav>
        </Navbar.Collapse>
        </Navbar>
    )


    return (
        <Fragment>
            {history.location.pathname.split("/")[1] !== 'student' && mainMenu() }
        </Fragment>
    )
            

}

export default withRouter(Menu);