import React, { useEffect, useState } from 'react';
import { Button, Modal} from 'react-bootstrap';
import { useDispatch} from 'react-redux';
import { history } from '../../../store';
import { deleteCourse } from '../../../store/course/details';
import { deleteModule } from '../../../store/course/module';


const DeleteModal = ({handleClose, show, url, redirectTo, type}) => {

    const dispatch = useDispatch();

    const deleteHandler = () => {
        if(type === 'course') {
            dispatch(deleteCourse(url))
            .then(() => {
                history.push(redirectTo)
                window.location.reload();
            });
        }else if (type === 'module') {
            console.log(url)
            dispatch(deleteModule(url))
            .then(() => {
                history.push(redirectTo)
                window.location.reload();
            });
        }

    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Attention cette action est irréversible</Modal.Title>
            </Modal.Header>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Annuler
            </Button>
            <Button 
            variant="danger" 
            onClick={deleteHandler}
            >
                Supprimer définitivement
            </Button>
            </Modal.Footer>
        </Modal>
    )

}

export default DeleteModal;