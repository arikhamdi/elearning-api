import React, { Fragment, useEffect, useState } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import {logout} from '../../store/user/auth';

import { Navbar, Nav, Form, Button, Dropdown, InputGroup, FormControl , Modal} from 'react-bootstrap';

import '../../Styles.css';
import ShowFavorisIcone from './menuFavoris';

const Menu = ({ history }) => {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);

    const { user, isAuthenticated} = useSelector(state => state.auth.auth);
    const { subjects, error }  = useSelector(state => state.entities);



    const isActive = (active, e) => { 
        if (active)
            e.target.style.color = 'red';   
        else
            e.target.style.color = '';
    }
    
    useEffect(() => {

            console.log('error', error)
    }, [error])


    const logoutHandler = session => {
        dispatch(logout(session))
        .then(() => {
            logoutModalClosehandler();
            history.push("/");
            window.location.reload();
        });

    }

    const logoutModalClosehandler = () => setShow(false);
    const logoutModalShowhandler = () => setShow(true);


    const logoutModal = () => (
        <Modal show={show} onHide={logoutModalClosehandler}>
        <Modal.Header closeButton>
          <Modal.Title>Se déconnecter</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={logoutModalClosehandler}>
            Annuler
          </Button>
          <Button 
          variant="primary" 
          onClick={() => logoutHandler('local')}
          >
            Ici uniquement
          </Button>
          <Button 
          variant="danger" 
          onClick={() => logoutHandler('global')}
          >
            Sur tout les appareils
          </Button>
        </Modal.Footer>
      </Modal>
    )

    const mainMenu = () => (
                <Navbar id="main-menu"  variant="light" expand="lg"   >
               
        <Nav.Link 
            className="navbar-brand mb-0 h1" 
            href="/"
            onMouseEnter={isActive.bind(this,true)} 
            onMouseLeave={isActive.bind(this,false)} >
            <span style={{color:'red'}}>E</span>learning
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
                    variant="outline-dark"
                    style={{borderRadius : "50px 0 0 50px" , borderRightColor: 'white'}}><i className="fas fa-search"></i></Button>
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
                <Nav.Link 
                    className="nav-link text-nowrap" 
                    href="/dashboard" 
                    onMouseEnter={isActive.bind(this,true)} 
                    onMouseLeave={isActive.bind(this,false)}>
                    Tableau de bord
                </Nav.Link>
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
                        <Nav.Link className="nav-link text-dark" href="/profile">Profile</Nav.Link>
                        <NavLink className="nav-link text-dark" to="/profile">link 1</NavLink>
                        <NavLink className="nav-link text-dark" to="/profile">link 2</NavLink>
                        <Dropdown.Divider />
                        <Nav.Link 
                            className="nav-link text-dark"
                            onClick={logoutModalShowhandler} >
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


    return (
        <Fragment>
            {history.location.pathname.split("/")[1] !== 'student' && (
                <Fragment>
                {logoutModal()}
                {mainMenu()} 
                </Fragment>
                )
                }
        </Fragment>
    )
            

}

export default withRouter(Menu);