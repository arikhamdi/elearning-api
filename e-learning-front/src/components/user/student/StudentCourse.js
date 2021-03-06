import React, { Fragment, useEffect, useState } from 'react'
import { Accordion, Card, Col, Container, Form, Image, Row, Spinner, Tab, Tabs, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import ReactPlayer from 'react-player'
import { getCourseDetailsProgress, LoadCourseDetails } from '../../../store/course/details';
import { history } from '../../../store';
import marked, { use } from 'marked'
import DOMPurify from 'dompurify'
import { 
    loadcontents,
    markContentAsAlreadySeen,
    unmarkContentAsAlreadySeen } from '../../../store/course/content';
import { Loader } from '../../Layout/Loader';
import { isEmpty } from '../../../utils/Utils';
import { MEDIA_ROOT } from '../../../config';

import './Student.css';

const StudentCourse = ({match}) => {


    const {course} = useSelector(state => state.entities.courseDetails);
    const {content, loading, checkBoxloading, alreadySeen } = useSelector(state => state.entities.content);
    const { user } = useSelector(state => state.auth.auth);

    const [newContent, setNewContent] = useState(true);



    const dispatch = useDispatch();

    useEffect(() => {
        /**
         * Searches for the first content marked as unread and loads the associated content
         * if all the contents are marked as already seen, that means the course has been 100% completed
         * and load the first content of the course
         * newContent is a flag that allows to do this operation only after the page has been reloaded 
         */
        if(newContent && !isEmpty(course)){
            let finish = true;
            let firstContent = null;

            for (const module of course.modules) {
                for (const content of module?.contents) {
                    if(!content.already_seen.find(x => x === user.id)) {
                        getContent(content.id);
                        finish = false;
                        break;
                    }else if (firstContent === null) {
                        firstContent = content;
                    }
                }  
            }
            if (finish) getContent(firstContent?.id);
            setNewContent(false);
        }
    },[course])

    useEffect(() => {
        dispatch(LoadCourseDetails(`/users/student/${match.params.slug}/`));
    },[alreadySeen])


    useEffect(() => {
        dispatch(getCourseDetailsProgress(`/users/student/${match.params.slug}/progress`))
    },[course])

    const contentsList = course?.modules?.find((module) => module.id == content?.module);
    const prevContent = contentsList?.contents?.find((x) => x?.order === content?.order -1);
    const nextContent = contentsList?.contents?.find((x) => x?.order === content?.order +1);
    const nextModule = course?.modules?.find(module => module?.order === contentsList?.order + 1);
    const prevModule = course?.modules?.find(module => module?.order === contentsList?.order - 1);


    const getContent = (contentId) => {  
        dispatch(loadcontents(`/users/student/${match.params.slug}/content/${contentId}/`))
        .then(() => history.push(`/student/${match.params.slug}/${contentId}/`));
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

    const contentPreviousHandler = () => {        
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
                   ( module, index) => (
                        <div key={module.id} style={{cursor: 'pointer', overflowX: 'hidden'}}>
                            <Accordion.Toggle as={Card.Header} eventKey={module.id} style={{textTransform: "capitalize", padding:'30px'}}>
                            Section {index + 1} : {module.title}
                            </Accordion.Toggle>
                            {module.contents && module.contents.map(item => (
                                <Accordion.Collapse 
                                    key={`${item?.id}`}  
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
                                        checked={item?.already_seen?.filter(x => x === user.id) > 0}
                                        onChange={(e) => alreadySeenHandler(e.target.checked, item.id)} 
                                        />
                                        }
                                    </Col>
                                    <Col xs="10" 
                                    onClick={() => getContent(item.id)}
                                    >
                                        <div 
                                        className="nav-link" 
                                        style={{backgroundColor: match.params.content == item.id && '#eaeaea', padding:'20px'}}
                                        >
                                        {item?.item?.title} 
                                        </div>
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

    const renderText = text => {
        let clean = DOMPurify.sanitize( text , {USE_PROFILES: {html: true}});
        const __html = marked(clean)
        return {__html}
    }


    const mainContent = () => {
            if (content && content.item?.video)
                return (
                    <Container>
                        <h2 className="text-center mb-2">{content.item?.title}</h2>
                        <ReactPlayer url={`${MEDIA_ROOT}${content.item?.video}`}
                                        controls
                                        width = "100%"
                                        height = "80vh"
                                    />
                        
                    </Container>
                );
            if (content && content.item?.image)
                return (
                    <Container style={{padding: '5vh 15vh', height: '90vh', overflowY: 'scroll'}}>
                        <h2 className="text-center mb-2">{content.item?.title}</h2>
                        <Image src={`${MEDIA_ROOT}${content.item?.image}`} style={{width: "99%" }}/>
                    </Container>

                    );
            else if (content && content.item?.file) 
                return (
                    <Container className="text-center" style={{padding: '5vh 15vh', height: '90vh', overflowY: 'scroll'}}>
                    <h2 className="text-center mb-5">{content.item?.title}</h2>
                    <Button 
                    style={{width: "70%", height: "70px", fontSize: "2em"}}
                    variant="warning" 
                    href={`${MEDIA_ROOT}${content.item?.file}`} 
                    target="_blank"  >Telecharger le fichier</Button>
                    </Container>);
            else 
                return (
                    <Container 
                        style={{padding: '5vh 15vh', height: '90vh', overflowY: 'scroll', wordWrap: "break-word"}}>
                    <h2 className="text-center mb-5">{content.item?.title}</h2>
                    <div dangerouslySetInnerHTML={renderText(content.item?.content)} />
                    </Container>
                );
              
    }

    const courseSubNavigation = () => {
        return (
                <Tabs defaultActiveKey="about" className="mb-5">
                    <Tab eventKey="about" title="Pr??sentation">
                        {aboutThisCourse()}
                    </Tab>
                    {/* <Tab eventKey="profile" title="Commentaires">
                        <h3 className="text-center">Commentaires</h3>
                    </Tab>
                    <Tab eventKey="contact" title="Questions">
                        <h3 className="text-center" >Questions</h3>
                    </Tab> */}
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
                    {/* <br/>
                    <br/>
                    <br/>
                    <h5>Adresse email du formateur</h5>
                    {course && course.owner?.email} */}
                </p>
            </Fragment>
        )
    }
    

    return (

        <Fragment>
        <Row id="student-page"  style={{marginRight: '0'}}>
            <Col xs={12} md={9} style={{paddingRight: '0px'}}>
            <Container fluid style={{position:'relative', height: '90vh'}}>
                {checkBoxloading ? mainContent()
                    : loading ? <Loader /> : mainContent()}

                
                {isEmpty(prevContent) && isEmpty(prevModule) ?
                    null
                    :
                    <div className="content-control-prev">
                        <span role="button" onClick={contentPreviousHandler} ><i className="fas fa-arrow-left"></i></span>
                    </div>
                }
                { isEmpty(nextContent) && isEmpty(nextModule) ?
                    null
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
