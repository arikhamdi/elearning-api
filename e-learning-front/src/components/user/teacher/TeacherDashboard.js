import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector} from 'react-redux';
import { Button, Card, Col, Row, Tab, Tabs } from 'react-bootstrap'
import { LayoutFluid } from '../../Layout/Layout'

import './teacher.css';
import { Loader } from '../../Layout/Loader';
import PageLayout from '../../Layout/PageLayout';
import { LoadCourses } from '../../../store/course/list';
import { history } from '../../../store';
import DeleteModal from './DeleteModal';
import { publishCourse, unPublishCourse } from '../../../store/course/details';

const TeacherDashboard = () => {

    const [key, setKey] = useState(history.location.hash ? history.location.hash : '#published');
    const [show, setShow] = useState(false);
    const [courseToDelete, setCourseToDelete] = useState("");
    const { list, loading } = useSelector(state => state.entities.courses);

    const publishedCourses = list?.filter(course => course.status === "published");
    const draftCourses = list?.filter(course => course.status === "draft");

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(LoadCourses('/users/teacher/courses/'));
    }, [dispatch])

    const deleteModalOpenhandler = courseSlug => {
        setCourseToDelete(courseSlug);
        setShow(true);
    }

    const publishCourseHandler = courseSlug => {
        dispatch(publishCourse(courseSlug));
        window.location.reload()
    }

    const unPublishCourseHandler = courseSlug => {
        dispatch(unPublishCourse(courseSlug));
        window.location.reload()
    }


    const publishedCourse = () => {
        return (
            <Fragment>
            <p style={{fontSize: "20px", fontWeight: "400"}}>{publishedCourses.length} cours publié</p>
            { loading ? <Loader />
            : publishedCourses.length > 0 ? publishedCourses.map( course => (
                <Card key={course.id} style={{flexDirection: 'row'}} className="mb-2">
                <Card.Img variant="top" src={course.image} style={{width:'20%'}}/>
                <Card.Body style={{width:'60%'}}>
                <Card.Title className="text-capitalize">
                    <Card.Link href={`/course/${course.slug}`}>{course.title}</Card.Link>
                </Card.Title>
                    <Card.Text>{course.owner?.first_name} {course.owner?.last_name}</Card.Text>
                </Card.Body>
                <Card.Body className="text-left" style={{width:'20%'}}>
                    <Button 
                    variant="dark" 
                    className="mb-2 form-control"
                    href={`/teacher/course/${course.slug}/edit`}
                    >
                            Editer ce cours   
                    </Button>
                    <Button 
                    variant="dark" 
                    className="mb-2 form-control"
                    >
                            Editer ce cours   
                    </Button>
                     <Button 
                     variant="danger"
                     className="mb-2 form-control"
                     onClick={() => unPublishCourseHandler(course.slug)}
                     >
                            Dépublier ce cours    
                    </Button>
                </Card.Body>
                </Card>
                
            ))
            :
            <PageLayout title="Aucun contenu" />
            }
            </Fragment>
        )
    }

    const unpublishedCourse = () => {
        return (
            <Fragment>
            <p style={{fontSize: "20px", fontWeight: "400"}}>{draftCourses.length} cours non publié</p>
            { loading ? <Loader />
            : draftCourses.length > 0 ? draftCourses.map( course => ( 
                <Card key={course.id} style={{flexDirection: 'row'}} className="mb-2">
                <Card.Img variant="top" src={course.image} style={{width:'20%'}}/>
                <Card.Body style={{width:'60%'}}>
                <Card.Title className="text-capitalize">
                    {course.title}
                </Card.Title>
                    <Card.Text>{course.owner?.first_name} {course.owner?.last_name}</Card.Text>
                </Card.Body>
                <Card.Body className="text-left" style={{width:'20%'}}>
                    <Button 
                    variant="primary" 
                    className="mb-2 form-control"
                    href={`/teacher/course/${course.slug}/edit`}
                    >
                            Editer ce cours   
                    </Button>
                    <Button 
                     variant="success"
                     className="mb-2 form-control"
                     onClick={() => publishCourseHandler(course.slug)}
                     >
                            Publier ce cours    
                    </Button>
                    {course?.students?.length > 0  ?
                        <Button 
                    variant="dark" 
                    className="mb-2 form-control"
                    >
                            Archiver ce cours   
                    </Button>
                    :
                    <Button 
                    variant="danger" 
                    className="mb-2 form-control"
                    onClick={() => deleteModalOpenhandler(course.slug)}
                    >
                            Supprimer ce cours   
                    </Button>
                    }
                    
                     
                </Card.Body>
                </Card>
                
            ))
            :
            <PageLayout title="Aucun contenu" />
            }
            </Fragment>
        )
    }


    return (
            <LayoutFluid
            title="Teacher"
            className="container"
            >

            <DeleteModal 
            show={show} 
            url={`/users/teacher/${courseToDelete}`} 
            type={'course'} redirectTo={'/teacher/course#draft'} 
            handleClose={() => 
            setShow(false)} 

            />
            <Row className="teacher-post row mb-5">
            <Col xs="12" md="8">
                    <h5 
                    style={{textTransform: 'capitalize'}}
                    >
                    <i
                    style={{fontSize: '80px'}}
                    className="fas fa-graduation-cap">
                    </i> 
                    Commencer la création d'un cours
                    </h5>
                </Col> 
                <Col xs="12" md="4">
                    <Button 
                    variant="danger"
                    size="lg" 
                    className="form-control" 
                    href="/teacher/course/new"
                    >
                    Créez votre cours
                    </Button>
                </Col>
              
            </Row>

            <Tabs 
            activeKey={key}
            onSelect={(k) => setKey(k)}
            >

                <Tab eventKey="#published" title="Cours publié">
                    {publishedCourse()}
                </Tab> 
                <Tab eventKey="#draft" title="Brouillon">
                   {unpublishedCourse()}
                </Tab>
            </Tabs>
            
            </LayoutFluid>
    )
}

export default TeacherDashboard
