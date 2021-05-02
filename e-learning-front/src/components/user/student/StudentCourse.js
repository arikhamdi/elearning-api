import React, { Fragment, useEffect } from 'react'
import { Accordion, Card, Col, Container, Form, Row, Spinner, Tab, Tabs } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import StudentMenu from './StudentMenu';
import ReactPlayer from 'react-player'
import { Link } from 'react-router-dom';


import './Student.css';
import { LoadCourseDetails } from '../../../store/course/details';
import { history } from '../../../store';
import { 
    loadcontents,
    markContentAsAlreadySeen,
    unmarkContentAsAlreadySeen } from '../../../store/course/content';
import { Loader } from '../../Layout/Loader';
import { isEmpty } from '../../../utils/Utils';

const StudentCourse = ({match}) => {

    const {course} = useSelector(state => state.entities.courseDetails);
    const {content, loading, checkBoxloading, alreadySeen } = useSelector(state => state.entities.content);
    const { user } = useSelector(state => state.auth.auth);

    const dispatch = useDispatch();



    const currentContent = content;


    useEffect(() => {
        dispatch(LoadCourseDetails(`/users/student/${match.params.slug}/7/`));
    },[alreadySeen])

    useEffect(() => {
        history.push(`/student/${match.params.slug}/7/`);
        // dispatch(LoadCourseDetails(`/users/student/${match.params.slug}/7/`));
        getContent(7);
    },[])

    const contentsList = course?.modules?.find((module) => module.id == content.module);
    const prevContent = contentsList?.contents?.find((x) => x.order === content.order -1);
    const nextContent = contentsList?.contents?.find((x) => x.order === content.order +1);
    const nextModule = course?.modules?.find(module => module.order === contentsList.order + 1);
    const prevModule = course?.modules?.find(module => module.order === contentsList.order - 1);

    const getContent = (contentId) => {
        dispatch(loadcontents(`/users/student/${match.params.slug}/content/${contentId}/`));
    } 

    const alreadySeenHandler = (e, id) => {
        if (e === true) {
            dispatch(markContentAsAlreadySeen(`${course.slug}/${id}/add/`));
        } else {
            dispatch(unmarkContentAsAlreadySeen(`${course.slug}/${id}/remove/`));
        }
    }

    const contentNextHandler = () => {        
        if(nextContent){
            dispatch(markContentAsAlreadySeen(`${course.slug}/${content.id}/add/`))
            .then(() => getContent(nextContent.id));  
        } else {
            const firstContentNextModule = nextModule?.contents?.find(content => content.order === 1);
            dispatch(markContentAsAlreadySeen(`${course.slug}/${content.id}/add/`))
            .then(() => getContent(firstContentNextModule?.id));
        }
        
    }

    const contentPrevHandler = () => {        
        if(prevContent){
            getContent(prevContent.id)
        } else {
            const lastContentPrevModule = nextModule?.contents?.find(content => content.order === prevModule?.contents?.length);
            getContent(lastContentPrevModule?.id);
        }
    }


    const modulesSidebar = () => {
        return (
            <Accordion >
                {course.modules && course.modules.map(
                    module => (
                        <div key={module.id} style={{cursor: 'pointer', overflowX: 'hidden'}}>
                            <Accordion.Toggle as={Card.Header} eventKey={module.id} style={{textTransform: "capitalize", padding:'30px'}}>
                            Section {module.id} : {module.title}
                            </Accordion.Toggle>
                            {module.contents && module.contents.map(item => (
                                <Accordion.Collapse 
                                    key={item.item.id}  
                                    eventKey={module.id}
                                    style={{ margin:'0px'}}
                                    >
                                    <Row >
                                    <Col xs={{ span: 1, offset: 1 }} style={{paddingTop: '20px'}}>
                                    {checkBoxloading ? 
                                        <Spinner as="span" animation="grow" role="status" role="status" aria-hidden="true"/>
                                        :
                                        <Form.Check 
                                        aria-label="readed"
                                        checked={item?.already_seen?.filter(x => x === user.pk) > 0}
                                        onChange={(e) => alreadySeenHandler(e.target.checked, item.id)} />
                                        }
                                    </Col>
                                    <Col xs="10" 
                                    onClick={() => getContent(item.id)}
                                    >
                                        <Link 
                                        className="nav-link" 
                                        to={`/student/${match.params.slug}/${item.id}/`}
                                        style={{backgroundColor: match.params.content == item.id && '#eaeaea', padding:'20px'}}
                                        >
                                        {item.item.title} 
                                        </Link>
                                    </Col>
                                    </Row>
                                </Accordion.Collapse>
                            ))}
                        </div>
                    ) 
                )}      
            </Accordion>
        )
    }


    const mainContent = () => {
            if (content.item?.url)
                return (
                    <Fragment>
                    
                        <ReactPlayer url={content.item?.url} 
                                        controls
                                        playbackRate = {2}
                                        width = "100%"
                                        height = "90vh"
                                    />
                        
                    </Fragment>
                );
            if (content && content.item?.image)
                return (
                    <Fragment>
                        {content.item?.image}
                    </Fragment>

                    );
            else if (content && content.item?.file) 
                return (
                    <Fragment>
                    <h2 className="text-center mb-5">{content.item?.title}</h2>
                        {content.item.file}
                    </Fragment>);
            else 
                return (
                    <Container 
                        style={{padding: '5vh 15vh'}}>
                    <h2 className="text-center mb-5">{content.item?.title}</h2>
                        {content.item?.content}
                    </Container>
                );
              
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
            <Col xs={12} md={9} style={{paddingRight: '0px'}}>
            <Container fluid style={{position:'relative',}}>
                {checkBoxloading ? mainContent()
                    : loading ? <Loader /> : mainContent()}

                
                { !isEmpty(prevContent)? 
                    <div className="content-control-prev">
                    <span role="button" onClick={contentPrevHandler} ><i className="fas fa-arrow-left"></i></span>
                </div>
                    :
                    null

                }
                { isEmpty(prevContent) ? 
                    isEmpty(prevModule) ?
                        null
                        :
                        <div className="content-control-prev">
                            <span role="button" onClick={contentPrevHandler} ><i className="fas fa-arrow-left"></i></span>
                        </div>
                        :
                    <div className="content-control-prev">
                        <span role="button" onClick={contentPrevHandler} ><i className="fas fa-arrow-left"></i></span>
                    </div>
                }
                { isEmpty(nextContent) ? 
                    isEmpty(nextModule) ?
                    null
                    :
                    <div className="content-control-next">
                        <span role="button" onClick={contentNextHandler}  ><i className="fas fa-arrow-right"></i></span>
                    </div>
                    :
                    <div className="content-control-next">
                        <span role="button" onClick={contentNextHandler}  ><i className="fas fa-arrow-right"></i></span>
                    </div>
                }

                
            </Container>

        
            <hr style={{marginTop: '0px'}} />
            {courseSubNavigation()}
            </Col>
            <Col xs={12} md={3} style={{padding: '0'}}>
            <div className="wrap" id="wrap">        
                {modulesSidebar()}
            </div>     

            </Col>
        </Row>
        </Fragment>

    )
}

export default StudentCourse
