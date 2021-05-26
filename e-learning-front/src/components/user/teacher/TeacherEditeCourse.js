import React, { Fragment, useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row, ListGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
// import { history } from '../../../store';
import { teacherLoadContents } from '../../../store/course/content';
import { LoadCourseDetails, EditCourseDetails } from '../../../store/course/details';
// import DeleteModal from './DeleteModal';

const TeacherEditeCourse = ({match}) => {

    const dispatch = useDispatch()
    // const [show, setShow] = useState(false);
    const [currentModule, setCurrentModule] = useState('');
    const { course, error } = useSelector(state => state.entities.courseDetails);
    // const { list } = useSelector(state => state.entities.subjects);
    const {contentsList} = useSelector(state => state.entities.content)

    const contentType = {
        "18" : "text",
        "20" : "image",
        "17" : "video",
        "21" : "file" 
    }

    // const [errors, setErrors] = useState({});

    // const [values, setValues] = useState({
    //     title: "",
    //     slug: "",
    //     image: "",
    //     overview : "",
    //     subject:"",
    // });

    // const { title, slug, image, overview, subject } = values;

    useEffect(() => {
        dispatch(LoadCourseDetails(`/users/teacher/${match.params.slug}`));
    }, [dispatch])

    // useEffect(() => {
    //     if (course) {
    //         setValues({
    //             title: course?.title,
    //             slug: course?.slug,
    //             image: course?.image,
    //             overview : course?.overview,
    //             subject: course?.subject?.id,
    //         })
    //     }
    //     if (error) {
    //         setErrors({...error});
    //     }

    // }, [course, error])

    // const formChangeHandler = name => e => {
    //     setValues({
    //         ...values,
    //         [name]: e.target.value
            
    //     });
    //     setErrors({});
    // }

    // const submitHandler = (e) => {
    //     e.preventDefault();
    //     const editedCourse = {
    //         title,
    //         slug,
    //         image,
    //         overview,
    //         subject
    //     }

    //     dispatch(EditCourseDetails(`/users/teacher/${course?.slug}/`, editedCourse));
    //     setErrors({});
    // }

    const loadModuleContents = (moduleId) => {
        dispatch(teacherLoadContents(moduleId))
        .then(setCurrentModule(moduleId))
    }

    // const courseEditForm = () => (
    //     <Form noValidate onSubmit={submitHandler} >
    //     <div className="bg-light" style={{padding: '30px'}}>
    //         <Form.Group >
    //             <Form.Row>
    //                 <Form.Label column lg={2}>
    //                     Categorie
    //                 </Form.Label>
    //                     <Col>
    //                         <Form.Control 
    //                         as="select"
    //                         value={subject}
    //                         onChange={formChangeHandler('subject')}>
    //                             {list && list.map(subjectOption => (
    //                                 <option key={subjectOption.id}  value={subjectOption.id}>{subjectOption.title}</option>
    //                             ))}
    //                         </Form.Control>
    //                     </Col>
    //                 </Form.Row>
    //             </Form.Group>
    //         <Form.Group>
    //             <Form.Row>
    //                 <Form.Label column lg={2}>
    //                     Titre
    //                 </Form.Label>
    //                 <Col>
    //                     <Form.Control 
    //                     type="text" 
    //                     placeholder="Entrer le titre" 
    //                     value={title}
    //                     onChange={formChangeHandler('title')}
    //                     isInvalid={errors?.title}
    //                     />
    //                     <Form.Control.Feedback type="invalid">
    //                         {errors?.title}
    //                     </Form.Control.Feedback>
    //                 </Col>
    //             </Form.Row>
    //             </Form.Group>
    //             <Form.Group>
    //             <Form.Row>
    //                 <Form.Label column lg={2}>
    //                     Slug
    //                 </Form.Label>
    //                 <Col>
    //                     <Form.Control 
    //                     type="text" 
    //                     placeholder="Entrer le slug" 
    //                     value={slug}
    //                     onChange={formChangeHandler('slug')}
    //                     isInvalid={errors?.slug}
    //                     />
    //                     <Form.Control.Feedback type="invalid">
    //                         {errors?.slug}
    //                     </Form.Control.Feedback>
    //                 </Col>
    //             </Form.Row>
    //             </Form.Group>
    //             <Form.Group>
    //             <Form.Row>
    //                 <Form.Label column lg={2}>
    //                     Image
    //                 </Form.Label>
    //                 <Col>
    //                     <Form.Control 
    //                     type="text" 
    //                     placeholder="Entrer l'url de l'image" 
    //                     value={image}
    //                     onChange={formChangeHandler('image')}
    //                     isInvalid={errors?.image}
    //                     />
    //                     <Form.Control.Feedback type="invalid">
    //                         {errors?.image}
    //                     </Form.Control.Feedback>
    //                 </Col>
    //             </Form.Row>
    //             </Form.Group>
    //             <Form.Group>
    //             <Form.Row>
    //                 <Form.Label column lg={2}>
    //                     Description
    //                 </Form.Label>
    //                 <Col>
    //                     <Form.Control 
    //                     as="textarea" 
    //                     rows={3}
    //                     placeholder="Entrer la descrtiption" 
    //                     value={overview}
    //                     onChange={formChangeHandler('overview')}
    //                     isInvalid={errors?.overview}
    //                     />
    //                     <Form.Control.Feedback type="invalid">
    //                         {errors?.overview}
    //                     </Form.Control.Feedback>
    //                 </Col>
    //             </Form.Row>
                

    //         </Form.Group>
    //         <div className="text-right mt-3">
    //             {! course?.students?.length > 0 &&
    //                 <Button 
    //                 variant="danger" 
    //                 className="float-left"
    //                 onClick={() => setShow(true)}
    //                 >Supprimer</Button>
    //             }
    //             <Button variant="dark" className="mr-3" href="/teacher/course">Retour</Button>
    //             <Button type="submit" className="mr-3">Enregistrer et continuer les modifications</Button>
    //             <Button type="submit">Enregistrer</Button>
    //         </div>
        
    //     </div>
    //     </Form>
    // )

    const modulesEdit = () => (
        <Fragment>
        <h4>Modules</h4>
        <ul>
        {
            course && course?.modules?.map((module, index) => (
                <li key={module?.id} style={{padding:"10px", listStyle: "none"}}>
                    <div onClick={() => loadModuleContents(module?.id)} style={{cursor: "pointer"}}>
                    <span>MODULE {index +1}</span><a className="float-right" href={`/teacher/course/${course?.slug}/${module?.id}/edit`}>editer</a>
                    <br />
                    <span style={{textTransform: "capitalize"}}>{module.title}</span>
                    </div>
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
        <ListGroup>
        {contentsList && contentsList.map( content => (
            <ListGroup.Item key={content?.item?.id}>
                {content?.item?.title}
                {/* <Button variant="danger" className="float-right" onClick={() => setShow(true)}><i className="fa fa-trash" aria-hidden="true"></i></Button> */}
                <Button  className="mr-2 float-right" href={`/teacher/course/module/${match.params.slug}/${currentModule}/content/${content?.id}/${contentType[content?.content_type]}/edit`}><i className="fas fa-pencil-alt"></i></Button>

            </ListGroup.Item>

        ))}
         {currentModule !== "" ? 
         <ListGroup.Item>
         <h4>Ajouter un nouveau contenu</h4>
            <Button variant="light" className="mr-2" href={`/teacher/course/module/${match.params.slug}/${currentModule}/content/text`}>Texte</Button>
            <Button variant="light" className="mr-2" href={`/teacher/course/module/${match.params.slug}/${currentModule}/content/image`}>Image</Button>
            <Button variant="light" className="mr-2" href={`/teacher/course/module/${match.params.slug}/${currentModule}/content/video`}>Video</Button>
            <Button variant="light" className="mr-2" href={`/teacher/course/module/${match.params.slug}/${currentModule}/content/file`}>Fichier</Button>
         </ListGroup.Item>
         :
         <h4>Selectionner un module pour y ajouter du contenu</h4>
         }

            
        </ListGroup>

    )
    return (
        <Fragment>
        <Container className="mt-5">
        {/* <DeleteModal 
        show={show} url={`/users/teacher/content/`} 
        type={'content'} 
        redirectTo={`/teacher/course/${match.params.slug}/edit`} 
        handleClose={() => setShow(false)} 
        /> */}
        <h1 className="text-center mb-5" style={{textTransform: 'capitalize'}}>"{course?.title}"
        <Button className="ml-5" href={`/teacher/course/${match.params.slug}/edit/overview`}>Editer la description</Button>
        </h1>
        
            {/* {courseEditForm()} */}
        
            <Row  style={{padding: '0 15px'}}>
                <Col md={4} className="bg-dark text-light" style={{padding: '30px'}}>
                    {modulesEdit()}
                </Col>
                <Col md={8} style={{padding: '30px'}}>
                    {contentsEdit()}
                </Col>
            </Row>

            
        
        </Container>

        </Fragment>
    )
}

export default TeacherEditeCourse
