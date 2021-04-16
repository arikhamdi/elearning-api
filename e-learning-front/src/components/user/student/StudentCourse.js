import React, { Fragment, useEffect } from 'react'
import { Accordion, Card, Col, Container, Nav, Row, Tab, Tabs } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { getContentById, getStudentCourse } from '../../../reducers/course/CourseActions';
import { isEmpty } from '../../../utils/Utils';
import StudentMenu from './StudentMenu';
import ReactPlayer from 'react-player'
import { Link } from 'react-router-dom';


import './Student.css';

const StudentCourse = ({match}) => {

    const {course} = useSelector(state => state.courseDetails);
    const {content} = useSelector(state => state.content);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getStudentCourse(match.params.slug));
        dispatch(getContentById(match.params.slug, match.params.content));
    },[dispatch])


    const loadContent = (contentId) => {
        dispatch(getContentById(match.params.slug, contentId));
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
                                    // className={match.params.module == module.id && 'show'} 
                                    key={item.item.id}  
                                    eventKey={module.id}
                                    style={{ margin:'0px'}}
                                    >
                                    <Card.Body  
                                    onClick={() => loadContent(item.id)}
                                    style={{padding:'0px'}}
                                    >
                                        <Link 
                                        className="nav-link" 
                                        to={`/student/${match.params.slug}/${module.id}/${item.id}`}
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
        if(typeof content !== "undefined" && !isEmpty(content)) {
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
            <div class="wrap" id="wrap">        
                {modulesSidebar()}
            </div>     

            </Col>
        </Row>
        </Fragment>

    )
}

export default StudentCourse
