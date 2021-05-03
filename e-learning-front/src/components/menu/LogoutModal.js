import React, { useEffect, useState } from 'react';
import { Button, Modal} from 'react-bootstrap';
import { useDispatch} from 'react-redux';
import { history } from '../../store';
import {logout} from '../../store/user/auth';


const LogoutModal = ({display}) => {

    

    const [show, setShow] = useState(false);
    const dispatch = useDispatch();

    const logoutModalClosehandler = () => setShow(false);

    const logoutHandler = session => {
        dispatch(logout(session))
        .then(() => {
            logoutModalClosehandler();
            history.push("/");
            window.location.reload();
        });

    }

    useEffect(() => {
        if(display) setShow(true);
    }, [display])
    


    return (
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

}

export default LogoutModal
