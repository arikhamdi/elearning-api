import React, { Fragment, useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row, ListGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
// import { history } from '../../../store';
// import { teacherLoadContents } from '../../../store/course/content';
import { LoadCourseDetails, EditCourseDetails } from '../../../store/course/details'
import DeleteModal from './DeleteModal';


const TeacherEditCourseOverview = ({match}) => {

    const dispatch = useDispatch()
    const [show, setShow] = useState(false);
    // const [currentModule, setCurrentModule] = useState('');
    const { course, error } = useSelector(state => state.entities.courseDetails)
    const { list } = useSelector(state => state.entities.subjects)
    // const {contentsList} = useSelector(state => state.entities.content)

    const [errors, setErrors] = useState({})

    const [values, setValues] = useState({
        title: "",
        slug: "",
        image: "",
        overview : "",
        subject:"",
    })

    const { title, slug, image, overview, subject } = values

    useEffect(() => {
        dispatch(LoadCourseDetails(`/users/teacher/${match.params.slug}`))
        
    }, [dispatch])

    useEffect(() => {
        setValues({
            title: course?.title || "",
            slug: course?.slug || "",
            image: course?.image || "",
            overview : course?.overview || "",
            subject: course?.subject?.id || "",
        })
        
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

    return (
        <Fragment>
        <DeleteModal 
        show={show} url={`/users/teacher/${course?.slug}`} 
        type={'course'} 
        redirectTo={'/teacher/course#draft'} 
        handleClose={() => setShow(false)} 
        />
            <Container>
                <h1>Editer "{course?.title}"</h1>
        <Form noValidate onSubmit={submitHandler} >
        <div className="bg-light" style={{padding: '30px'}}>
            <Form.Group >
                <Form.Row>
                    <Form.Label column lg={2}>
                        Categorie
                    </Form.Label>
                        <Col>
                            <Form.Control 
                            as="select"
                            value={subject}
                            onChange={formChangeHandler('subject')}>
                                {list && list.map(subjectOption => (
                                    <option key={subjectOption.id}  value={subjectOption.id}>{subjectOption.title}</option>
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
            
                    <Button 
                    variant="danger" 
                    className="float-left"
                    onClick={() => setShow(true)}
                    disabled={course?.students?.length > 0 ? "disabled" : null}
                    >Supprimer</Button>
                
                <Button variant="dark" className="mr-3" href={`/teacher/course/${match.params.slug}/edit`}>Retour</Button>
                <Button type="submit">Enregistrer</Button>
            </div>
        
        </div>
        </Form>
        </Container>
        </Fragment>
    )

    
}

export default TeacherEditCourseOverview
