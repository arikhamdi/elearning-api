import React, { Fragment, useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { history } from '../../../store';
import { LoadCourseDetails, EditCourseDetails } from '../../../store/course/details';
import DeleteModal from './DeleteModal';

const TeacherEditeCourse = ({match}) => {

    const dispatch = useDispatch()
    const [show, setShow] = useState(false);
    const { course, error } = useSelector(state => state.entities.courseDetails);
    const { list } = useSelector(state => state.entities.subjects);

    const [errors, setErrors] = useState({});

    const [values, setValues] = useState({
        title: "",
        slug: "",
        image: "",
        overview : "",
        subject:"",
    });

    const { title, slug, image, overview, subject } = values;

    useEffect(() => {
        dispatch(LoadCourseDetails(`/users/teacher/${match.params.slug}`));
    }, [dispatch])

    useEffect(() => {
        if (course) {
            setValues({
                title: course?.title,
                slug: course?.slug,
                image: course?.image,
                overview : course?.overview,
                subject: course?.subject?.id,
            })
        }
        if (error) {
            setErrors({...error});
        }

    }, [course, error])

    const formChangeHandler = name => e => {
        setValues({
            ...values,
            [name]: e.target.value
        });
        setErrors({});
    }

    const submitHandler = (e) => {
        e.preventDefault();
        const editedCourse = {
            title,
            slug,
            image,
            overview,
            subject
        }

        dispatch(EditCourseDetails(`/users/teacher/${course?.slug}/`, editedCourse));
        setErrors({});
    }


    const courseEditForm = () => (
        <div className="bg-light" style={{padding: '30px'}}>
            <Form.Group >
                <Form.Row>
                    <Form.Label column lg={2}>
                        Categorie
                    </Form.Label>
                        <Col>
                            <Form.Control 
                            as="select"
                            onChange={formChangeHandler('subject')}>
                                {list && list.map(subjectOption => (
                                    <option key={subjectOption.id} selected={subject == subjectOption.id ? 'selected' : false} value={subjectOption.id}>{subjectOption.title}</option>
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
            <div className="text-right mt-3">
                {! course?.students?.length > 0 &&
                    <Button 
                    variant="danger" 
                    className="float-left"
                    onClick={() => setShow(true)}
                    >Supprimer</Button>
                }
                <Button variant="dark" className="mr-3" href="/teacher/course">Retour</Button>
                <Button type="submit" className="mr-3">Enregistrer et continuer les modifications</Button>
                <Button type="submit">Enregistrer</Button>
            </div>
        
        </div>
    )

    const modulesEdit = () => (
        <Fragment>
        <h4>Modules</h4>
        <ul>
        {
            course && course?.modules?.map((module) => (
                <li style={{padding:"10px", listStyle: "none"}}>
                    <a href="">
                    <span>MODULE {module.order}</span><a className="float-right" href={`/teacher/course/${course?.slug}/${module?.id}/edit`}>editer</a>
                    <br />
                    <span style={{textTransform: "capitalize"}}>{module.title}</span>
                    </a>
                </li>
            ))
        }
        </ul>
            <Button 
            variant="dark" 
            className="nav-link float-right" 
            href={`/teacher/course/${course?.slug}/module/new`}
            >
            Ajouter un nouveau module
            </Button>
        </Fragment>
        
    )

    const contentsEdit = () => (
        <Fragment>
            <h4>Ajouter un nouveau contenu</h4>
            <Button variant="light" className="mr-2">Texte</Button>
            <Button variant="light" className="mr-2">Image</Button>
            <Button variant="light" className="mr-2">Video</Button>
            <Button variant="light" className="mr-2">Fichier</Button>
        </Fragment>

    )
    return (
        <Fragment>
        <Container className="mt-5">
        <DeleteModal 
        show={show} url={`/users/teacher/${course?.slug}`} 
        type={'course'} 
        redirectTo={'/teacher/course#draft'} 
        handleClose={() => setShow(false)} 
        />
        <h1 className="text-center mb-5" style={{textTransform: 'capitalize'}}>Editer "{course?.title}"</h1>
        <Form noValidate onSubmit={submitHandler} >
            {courseEditForm()}

            <Row  style={{padding: '0 15px'}}>
                <Col md={4} className="bg-dark text-light" style={{padding: '30px'}}>
                    {modulesEdit()}
                </Col>
                <Col md={8} style={{padding: '30px'}}>
                    {contentsEdit()}
                </Col>
            </Row>

            
        </Form>
        </Container>

        </Fragment>
    )
}

export default TeacherEditeCourse
