import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card,  Container, Jumbotron, ListGroup, Spinner} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { Loader } from '../Layout/Loader';
import { enrollStudent, LoadCourseDetails, setCurrentStudent } from '../../store/course/details';
import { isEmpty } from '../../utils/Utils';
import NotFound from '../pages/NotFound';

import '../../Styles.css';

const CourseDetails = ({match}) => {

    const dispatch = useDispatch();

    const [favoris, setFavoris] = useState();

    const { course, loading, button_loading, isStudent } = useSelector(state => state.entities.courseDetails);


    useEffect(() => {
        setFavoris({favoris : isStudent})
    }, [button_loading, isStudent])

    useEffect(() => {
        dispatch(LoadCourseDetails(match.params.slug));
    }, [dispatch, isStudent])



    const addCourseToFavoris = () => {
        dispatch(enrollStudent(`${match.params.slug}/enroll/`));
    }


    const displayCourseInfos = () => (
        <Fragment>
            <h5>{course.subject.title}</h5>
            <h1>{course.title}</h1>
            <p>{course.overview}</p>
            <p>Crée par {course.owner.name}</p>
            {button_loading ? 
                <Button variant="outline-light" size="lg" disabled>
                        <Spinner
                        as="span"
                        animation="grow"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        />
                        Loading...
                    </Button>
                    :
            <Button variant="outline-light" size="lg" onClick={addCourseToFavoris} >{isStudent ? "Favoris" : "Ajouter aux favoris"}  <i className={isStudent ? "fa fa-heart" : "far fa-heart"}></i></Button>
            }
        </Fragment>
    )

    const displayCourseSideSticky = () => (
        <React.Fragment>
                <Card className="mb-3">
                <Card.Img variant="top" src={course.image} />
                <Card.Header style={{textTransform: 'capitalize'}}>Créé par <cite title="Source Title">{course.owner.name}</cite>
                </Card.Header>
                <Card.Body>
                <Card.Title style={{textTransform: 'capitalize'}} >{course.title}</Card.Title> 
                <Card.Text>{course.overview}</Card.Text>
                <footer className="text-right">
                {isStudent  ?
                    ( 
                        <Button className="btn btn-info mb-2 form-control"  href={`/student/${course.slug}`}>Accéder au cours</Button>    
                    ): (
                        <Fragment>
                        <Button className="btn btn-info mb-2 form-control" variant="danger">Ajouter au panier</Button>
                        <Button className="btn mb-2 form-control" variant="outline-danger">Acheter ce cours</Button>
                        </Fragment>
                    )
                }
                
                </footer>
            </Card.Body>
            </Card> 
                
                </React.Fragment>
    );

    const displayCourseContents = () => (
        <React.Fragment>
                    <h3 className="mb-3" style={{textTransform: 'capitalize'}} >Contenu du cours</h3>
                    <ListGroup>
                    {course.modules.map( module => (      
                        <ListGroup.Item key={module.id} style={{textTransform: 'capitalize'}}>{module.title}</ListGroup.Item>    
                    ))}
                    </ListGroup> 
                
                </React.Fragment>
    )


    if (loading) {
        return <Loader />;
    }
    else if (isEmpty(course)) {
        return <NotFound />;
    }
    else {
        
        return (
            
            <div className="course-details-fragment">
            <Jumbotron fluid style={{minHeight: '300px', backgroundColor:"#333"}}>
            <Container>
            <div className="course-description">
                    {displayCourseInfos()}
                </div>
            </Container>

            </Jumbotron>

           
            <Container className="course-details" >
                <div  className="course-content">
                    {displayCourseContents()}  
                    {displayCourseContents()}  
                    {displayCourseContents()}  
                    {displayCourseContents()}  
                </div>
                <div className="course-side">
                    {displayCourseSideSticky()}
                </div>
            </Container>
           

        </div>
            
            );
    }
    
            

}

export default withRouter(CourseDetails);
