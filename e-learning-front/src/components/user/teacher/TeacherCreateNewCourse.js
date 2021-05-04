import React, { Fragment, useEffect, useState } from 'react'
import { Button, Col, Container, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { addNewCourse } from '../../../store/course/list';

const TeacherCreateNewCourse = () => {

    const dispatch = useDispatch()

    const { error } = useSelector(state => state.entities.courses);
    const { list } = useSelector(state => state.entities.subjects);

    const [errors, setErrors] = useState({});
    const [values, setValues] = useState({
        title: "",
        image: "",
        overview : "",
        subject: 1
    })
    
    const { title, image, overview, subject } = values;

    useEffect(() => {
        if (error) {
            setErrors({...error});
        }
        console.log(errors)
    }, [error])
    
    
    const formChangeHandler = name => e => {
        setValues({
            ...values,
            [name]: e.target.value
        });
        setErrors({});
    }

    const submitHandler = (e) => {
        e.preventDefault();
        const newCourse = {
            title,
            image,
            overview,
            subject
        }
        dispatch(addNewCourse(newCourse));
    }

    return (
        <Fragment>
        <Container>
        <h1>Creer un cours</h1>
        <Form noValidate onSubmit={submitHandler}>
            <Form.Group >
                <Form.Row>
                    <Form.Label column lg={2}>
                        Categorie
                    </Form.Label>
                        <Col>
                            <Form.Control 
                            as="select"
                            onChange={formChangeHandler('subject')}>
                                {list && list.map(subject => (
                                    <option key={subject.id} value={subject.id}>{subject.title}</option>
                                ))}
                            </Form.Control>
                        </Col>
                    </Form.Row>
                </Form.Group>
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
                        Image
                    </Form.Label>
                    <Col>
                        <Form.Control 
                        type="text" 
                        placeholder="Entrer le titre" 
                        value={image}
                        onChange={formChangeHandler('image')}
                        isInvalid={errors?.image}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors?.image}
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
                        placeholder="Entrer le titre" 
                        value={overview}
                        onChange={formChangeHandler('overview')}
                        isInvalid={errors?.overview}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors?.overview}
                        </Form.Control.Feedback>
                    </Col>
                </Form.Row>
                
                <Button type="submit">Ajouter</Button>
            </Form.Group>
        </Form>
            
        </Container>

        </Fragment>
    )
}

export default TeacherCreateNewCourse
