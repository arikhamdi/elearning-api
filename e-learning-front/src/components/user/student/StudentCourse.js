import React, { Fragment, useEffect } from 'react'
import { Accordion, Card, Col, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { getContentById, getStudentCourse } from '../../../reducers/course/CourseActions';
import { isEmpty } from '../../../utils/Utils';
import StudentMenu from './StudentMenu';
import ReactPlayer from 'react-player'

const StudentCourse = ({match}) => {

    const {course} = useSelector(state => state.courseDetails);
    const {content} = useSelector(state => state.content);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getStudentCourse(match.params.slug));
    },[dispatch, content])


    const loadContent = (contentId) => {
        dispatch(getContentById(match.params.slug, contentId));
        console.log('contentId', contentId)
    } 

    const modulesSidebar = () => {
        return (
            <Accordion>
                {course.modules && course.modules.map(
                    module => (
                        <Card key={module.id} style={{cursor: 'pointer'}}>
                            <Accordion.Toggle as={Card.Header} eventKey={module.id} style={{textTransform: "capitalize"}}>
                            Section {module.id} : {module.title}
                            </Accordion.Toggle>
                            {module.contents && module.contents.map(item => (
                                <Accordion.Collapse key={item.item.id} eventKey={module.id}>
                                    <Card.Body onClick={() => loadContent(item.id)} >{item.item.title}</Card.Body>
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
                return <ReactPlayer url={content.item.url} 
                controls
                playbackRate = {2}
                width = "100%"
                height = "504px"
               />;
            if (content && content.item.image)
                return (content.item.image);
            else if (content && content.item.file) 
                return (content.item.file);
            else 
                return (content.item.content)
        }         
    }
    

    return (

        <Fragment>
        <StudentMenu title={course.title} />
        <Row>
            <Col xs={12} md={8}>
            {mainContent()}
            </Col>
            <Col xs={12} md={4}>
            {modulesSidebar()}
            </Col>
        </Row>
        </Fragment>

    )
}

export default StudentCourse
