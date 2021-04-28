import React, { Fragment, useEffect } from 'react'
import { Accordion, Card, Col, Container, Nav, Row, Tab, Tabs } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { isEmpty } from '../../../utils/Utils';
import StudentMenu from './StudentMenu';
import ReactPlayer from 'react-player'
import { Link } from 'react-router-dom';


import './Student.css';
import { LoadCourseDetails } from '../../../store/course/details';
import { history } from '../../../store';
import { Loadcontents } from '../../../store/course/content';
import { Loader } from '../../Layout/Loader';

const StudentCourse = ({match}) => {

    const {course, loading, error} = useSelector(state => state.entities.courseDetails);
    const {content, content_errors} = useSelector(state => state.entities.content);
    const dispatch = useDispatch();

    useEffect(() => {
        if (error || content_errors) {
            history.push(`/student/${match.params.slug}/6/`);
            dispatch(LoadCourseDetails(`/users/student/${match.params.slug}/6/`));
            getContent(6);
        }else {
            dispatch(LoadCourseDetails(`/users/student/${match.params.slug}/${match.params.content}/`));
            getContent(match.params.content);
        }

    },[dispatch, error, content_errors])

    const getContent = (contentId) => {
        dispatch(Loadcontents(`/users/student/${match.params.slug}/content/${contentId}/`));
    } 


    const modulesSidebar = () => {
        return (
            <Accordion >
                {course.modules && course.modules.map(
                    module => (
                        <Card key={module.id} style={{cursor: 'pointer'}}>
                            <Accordion.Toggle as={Card.Header} eventKey={module.id} style={{textTransform: "capitalize", padding:'30px'}}>
                            Section {module.id} : {module.title}
                            </Accordion.Toggle>
                            {module.contents && module.contents.map(item => (
                                <Accordion.Collapse 
                                    key={item.item.id}  
                                    eventKey={module.id}
                                    style={{ margin:'0px'}}
                                    >
                                    <Card.Body  
                                    onClick={() => getContent(item.id)}
                                    style={{padding:'0px'}}
                                    >
                                        <Link 
                                        className="nav-link" 
                                        to={`/student/${match.params.slug}/${item.id}/`}
                                        style={{backgroundColor: match.params.content == item.id && '#eaeaea', padding:'20px'}}
                                        >
                                        {item.item.title}
                                        </Link>
                                    </Card.Body>
                                </Accordion.Collapse>
                            ))}
                        </Card>
                    ) 
                )}      
            </Accordion>
        )
    }


    const mainContent = () => {
        if(loading || isEmpty(content)) {
            <Loader />
        }
            else{
            if (content.item.url)
                return (
                    <Fragment>
                    
                        <ReactPlayer url={content.item.url} 
                                        controls
                                        playbackRate = {2}
                                        width = "100%"
                                        height = "90vh"
                                    />
                        
                    </Fragment>
                );
            if (content && content.item.image)
                return (
                    <Fragment>
                        {content.item.image}
                    </Fragment>

                    );
            else if (content && content.item.file) 
                return (
                    <Fragment>
                    <h2 className="text-center mb-5">{content.item.title}</h2>
                        {content.item.file}
                    </Fragment>);
            else 
                return (
                    <Container 
                        style={{padding: '5vh 15vh'}}>
                    <h2 className="text-center mb-5">{content.item.title}</h2>
                        {content.item.content}
                    </Container>
                );
        }         
    }

    const courseSubNavigation = () => {
        return (
                <Tabs defaultActiveKey="about" className="mb-5">
                    <Tab eventKey="about" title="Présentation">
                        {aboutThisCourse()}
                    </Tab>
                    <Tab eventKey="profile" title="Commentaires">
                        <h3 className="text-center">Commentaires</h3>
                    </Tab>
                    <Tab eventKey="contact" title="Questions">
                        <h3 className="text-center" >Questions</h3>
                    </Tab>
                </Tabs>
        );
    }
    
    const aboutThisCourse = () => {
        return (
            <Fragment>
                <h3 className="text-center">A propos de ce cours</h3>
                <p 
                    style={{padding: '5vh 15vh'}}
                    >
                    {course && course.overview}
                </p>
            </Fragment>
        )
    }
    

    return (

        <Fragment>
        <StudentMenu title={course.title} />
        <Row id="student-page"  style={{marginRight: '0'}}>
            <Col xs={12} md={8} style={{padding: '0'}}>
            {mainContent()}
            <hr/>
            {courseSubNavigation()}
            </Col>
            <Col xs={12} md={4} style={{padding: '0'}}>
            <div className="wrap" id="wrap">        
                {modulesSidebar()}
            </div>     

            </Col>
        </Row>
        </Fragment>

    )
}

export default StudentCourse
