import React, {Fragment, useState, useEffect} from 'react'
import { Button, Col, Container, Form } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux';
import { history } from '../../../store';
import { editModule, loadModule } from '../../../store/course/module';
import DeleteModal from './DeleteModal';

const TeacherEditModule = ({match}) => {
    
    const dispatch = useDispatch();

    const { error, moduleDetails, loading } = useSelector(state => state.entities.module);
    const [show, setShow] = useState(false);
    const [errors, setErrors] = useState({});
    const [values, setValues] = useState({
        title: "",
        overview: ""
    });
    const {title, overview} = values;

    useEffect(() => {
        dispatch(loadModule(`/users/teacher/module/${match.params.module}/`));
    }, [dispatch])

    useEffect(() => {
        if (error) {
            setErrors({...error});
        } else if (!error) {
            history.push(`/teacher/course/${match.params.slug}/edit`);
            window.location.reload();
        }

        if (moduleDetails){
            setValues({
                title: moduleDetails?.title,
                overview: moduleDetails?.overview
            });
        }
    }, [error, moduleDetails])

    const formChangeHandler = name => e => {
        setValues({
            ...values,
            [name]: e.target.value
        });
        setErrors({});
    }

    const submitHandler = (e) => {
        e.preventDefault();
        const module = {
            title,
            overview
        };
        dispatch(editModule(`/users/teacher/module/${match.params.module}/`, module));
    };

    return (
        <Fragment>
        <DeleteModal 
        show={show} 
        url={`/users/teacher/module/${moduleDetails?.id}/`}
        type={"module"}
        redirectTo={`/teacher/course/${match.params.slug}/edit`} 
        handleClose={() => setShow(false)} 

        />
            <Container>
                <h1>Editer le module "{moduleDetails?.title}"</h1>
                <Form noValidate onSubmit={submitHandler}>
                    <Form.Group>
                        <Form.Row>
                            <Form.Label column lg={2}>
                                Titre
                            </Form.Label>
                            <Col>
                                <Form.Control 
                                type="text" 
                                placeholder="Entrer le titre" 
                                value={title}
                                onChange={formChangeHandler('title')}
                                isInvalid={errors?.title}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors?.title}
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Row>
                    </Form.Group>
                    <Form.Group>
                <Form.Row>
                    <Form.Label column lg={2}>
                        Description
                    </Form.Label>
                    <Col>
                        <Form.Control 
                        as="textarea" 
                        rows={3}
                        placeholder="Entrer la descrtiption" 
                        value={overview}
                        onChange={formChangeHandler('overview')}
                        isInvalid={errors?.overview}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors?.overview}
                        </Form.Control.Feedback>
                    </Col>
                </Form.Row>
            </Form.Group>
            <Form.Group className="text-right">
            <Button variant="danger" className="float-left" onClick={() => setShow(true)} >Supprimer</Button>
            <Button variant="dark mr-3" href={`/teacher/course/${match.params.slug}/edit`}>retour</Button>
            {loading ? 
                <Button type="submit" disabled>Loading</Button>
            :
            <Button type="submit" >Editer</Button>
            }
            
            </Form.Group>
                
                </Form>
            </Container>
        </Fragment>

    )
}

export default TeacherEditModule;
