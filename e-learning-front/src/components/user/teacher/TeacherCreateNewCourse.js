import React, { Fragment, useEffect, useState } from 'react'
import { Button, Col, Container, Form, OverlayTrigger, Popover } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { history } from '../../../store';
import { addNewCourse } from '../../../store/course/list';

const TeacherCreateNewCourse = () => {

    const dispatch = useDispatch();

    const { error } = useSelector(state => state.entities.courses);
    const { list } = useSelector(state => state.entities.subjects);

    const [errors, setErrors] = useState({});

    const [slug, setSlug] = useState("");
    const [slugFlag, setSlugFlag] = useState(true);

    const [values, setValues] = useState({
        title: "",
        image: "",
        overview : "",
        subject: 5
    });
    
    
    const { title, image, overview, subject } = values;

    const popover = (
        <Popover id="popover-basic">
          <Popover.Title as="h3">Image de couverture</Popover.Title>
          <Popover.Content>
            Nous ne stockons pas directement d'image sur le site. Seul un lien vers l'image peut être ajouté.
            Si vous ne savez pas comment faire, nous vous invitons à regarder du coté de platform tel que -  
            <a href="https://cloudinary.com/" target="_blank">Coudinary</a>
          </Popover.Content>
        </Popover>
      );

    useEffect(() => {
        if (error) {
            setErrors({...error});
        } else {
            history.push('/teacher/course#draft');
            window.location.reload();
        }
        
    }, [error])
    
    
    const formChangeHandler = name => e => {
        /**
         * Prepopulate slug field based on title field while slugFlag 
         * is set True. slugFlag is set to false only after editing
         * slug field
         */
        if (slugFlag && name === 'title') {
            setSlug(e.target.value.replaceAll(' ', '-'));
        }else if (name === "slug") {
            setSlugFlag(false);
            setSlug(e.target.value.replaceAll(' ', '-'));
        }

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
            slug,
            image,
            overview,
            subject
        };
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
                        Slug
                    </Form.Label>
                    <Col>
                        <Form.Control 
                        type="text" 
                        placeholder="Entrer le slug" 
                        value={slug}
                        onChange={formChangeHandler('slug')}
                        isInvalid={errors?.slug}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors?.slug}
                        </Form.Control.Feedback>
                    </Col>
                </Form.Row>
                </Form.Group>
                <Form.Group>
                <Form.Row>
                    <Form.Label column lg={2}>
                        Image 
                        <OverlayTrigger  trigger="click" placement="right" overlay={popover}>
                            <Button className="float-right" size="sm" variant="outline-dark" style={{border:"none"}}><i className="fas fa-question-circle"></i></Button>
                        </OverlayTrigger>
                    </Form.Label>
                    <Col>
                        <Form.Control 
                        type="text" 
                        placeholder="Entrer l'url de l'image" 
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
            <Button className="float-right" type="submit">Ajouter</Button>
            <Button className="ml-3" variant="dark" href={`/teacher/course`} >Retour</Button>
        </Form>
            
        </Container>

        </Fragment>
    )
}

export default TeacherCreateNewCourse
