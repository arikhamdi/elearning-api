import React, { Fragment, useEffect } from 'react'
import { enrollStudent, getCourseDetails } from '../../reducers/course/CourseActions';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, ListGroup} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { isEmpty } from '../../utils/Utils';
import { Loader } from '../Layout/Loader';

const CourseDetails = ({match}) => {

    const dispatch = useDispatch();
    const {course, loading, isStudent, error} = useSelector(state => state.courseDetails);
    const { user, isAuthenticated } = useSelector(state => state.auth);



    useEffect(() => {
        dispatch(getCourseDetails(match.params.slug))
    }, [dispatch, match.params.slug, user, isStudent])


    const followThisCourse = () => {
        console.log('isStudent', isStudent)
        dispatch(enrollStudent(match.params.slug));
    }

    return (
        <div>
            <React.Fragment>
                {isEmpty(course) ? 
                    <Loader />
                : (
                    <React.Fragment>
                <Card className="mb-3">
                <Card.Img variant="top" src={course.image} />
                <Card.Header style={{textTransform: 'capitalize'}}>Créé par <cite title="Source Title">{course.owner.name}</cite>
                {!isStudent  && (
                    isAuthenticated ? 
                    <Button variant="success" onClick={followThisCourse} style={{float: 'right'}}>Suivre ce cours</Button>
                    : 
                    <Link className="btn btn-info" to="/login" style={{float: 'right'}}> Login</Link>
                )}
                </Card.Header>
                <Card.Body>
                <Card.Title style={{textTransform: 'capitalize'}} >{course.title}</Card.Title> 
                <Card.Text>{course.overview}</Card.Text>
                <footer className="text-right">
                {isStudent  && (
                    <Fragment>
                        <Link className="btn btn-info" style={{float:'left'}} to={`/student/${course.slug}`}>continuer ce cours</Link>
                        <Button variant="danger" onClick={followThisCourse}  >Arreter ce cours</Button>
                    </Fragment>
                )} 
                </footer>
            </Card.Body>
            </Card>
                    <h3 className="mb-3" style={{textTransform: 'capitalize'}} >Contenu du cours</h3>
                    <ListGroup>
                    {course.modules.map( module => (      
                        <ListGroup.Item key={module.id} style={{textTransform: 'capitalize'}}>{module.title}</ListGroup.Item>    
                    ))}
                    </ListGroup> 
                </React.Fragment>
                )}
            </React.Fragment>
        </div>
    )
}

export default CourseDetails
