import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card,  Container, Jumbotron, ListGroup, Spinner} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { Loader } from '../Layout/Loader';
import { LoadCourseDetails} from '../../store/course/details';
import {
    addItemToFavoris,
    removeItemFromFavoris,
    addItemToFavorisLoggedInUser,
    removeItemToFavorisLoggedInUser
} from '../../store/user/favoris'
import NotFound from '../pages/NotFound';

import '../../Styles.css';

const CourseDetails = ({match}) => {

    const dispatch = useDispatch();

    const { course, loading, error } = useSelector(state => state.entities.courseDetails);
    const { isAuthenticated, isSubscribed } = useSelector(state => state.auth.auth)
    const { favorisItems, favoriteLoading} = useSelector(state => state.auth.favoris);

    const favoris = favorisItems.find((item) => item.id == course.id);

    useEffect(() => {
        dispatch(LoadCourseDetails(match.params.slug));
    }, [dispatch, isSubscribed])


    const addToFavorisHandler = () => {
        if(isAuthenticated) {
           return  dispatch(addItemToFavorisLoggedInUser(course));
        }
        dispatch(addItemToFavoris(course));
    }
    const removefromFavorisHandler = () => {
        if(isAuthenticated) {
            return  dispatch(removeItemToFavorisLoggedInUser(course));
         }
        dispatch(removeItemFromFavoris(course));
    }

    const displayCourseInfos = () => (
        <Fragment>
            <h5>{course.subject?.title}</h5>
            <h1>{course.title}</h1>
            <p>{course.overview}</p>
            <p>Crée par {course.owner?.name}</p>
            {favoriteLoading ? 
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
                    : favoris ?
            <Button 
                variant="outline-light" size="lg" 
                onClick={removefromFavorisHandler} 
            >
                Supprimer des favoris <i className="fas fa-star"></i>
            </Button>
            :
            <Button 
                variant="outline-light" size="lg" 
                onClick={addToFavorisHandler} 
            >
                Ajouter aux favoris <i className="far fa-star"></i>
            </Button>
            }
        </Fragment>
    );

    const displayCourseSideSticky = () => (
        <React.Fragment>
                <Card className="mb-3">
                <Card.Img variant="top" src={course.image} />
                <Card.Header style={{textTransform: 'capitalize'}}>Créé par <cite title="Source Title">{course.owner?.first_name} {course.owner?.last_name}</cite>
                </Card.Header>
                <Card.Body>
                <Card.Title style={{textTransform: 'capitalize'}} >{course.title}</Card.Title> 
                <Card.Text>{course.overview}</Card.Text>
                <footer className="text-right">
                {favoris && isSubscribed && isAuthenticated &&
                    <Button className="btn btn-info mb-2 form-control"  href={`/student/${course.slug}`}>Accéder au cours</Button>
                }  
                    
                       
                {isAuthenticated  == false || isSubscribed == false ? 
                    <Button 
                    className="btn btn-info mb-2 form-control" 
                    variant="danger"
                    href="/subscribe"
                    >
                        Abonnez-vous
                    </Button>
                    :
                    null
                }
                {favoriteLoading ? 
                <Button variant="outline-danger" className="btn mb-2 form-control" size="lg" disabled>
                    <Spinner as="span" animation="grow" role="status" size="sm" role="status" aria-hidden="true"/>
                    Loading...
                </Button>
                    : !favoris &&
                            <Button 
                            className="btn mb-2 form-control" 
                            variant="outline-danger"
                            onClick={addToFavorisHandler} 
                            >
                                Ajouter aux favoris <i className="far fa-star"></i>
                            </Button>
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
                    {course.modules && course.modules.map( module => (      
                        <ListGroup.Item key={module.id} style={{textTransform: 'capitalize'}}>{module.title}</ListGroup.Item>    
                    ))}
                    </ListGroup> 
                
                </React.Fragment>
    );


        return (
            <Fragment>
                {loading ? 
                    <Loader /> 
                : error ? <NotFound /> : 
                    (
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
                                </div>
                                <div className="course-side">
                                    {displayCourseSideSticky()}
                                </div>
                            </Container>
                        </div>
                    )}
            </Fragment>
            );
    
    
            

}

export default withRouter(CourseDetails);
