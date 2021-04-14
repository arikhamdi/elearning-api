import React, { useEffect } from 'react'
import { getCourseDetails } from '../../reducers/course/CourseActions';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, ListGroup } from 'react-bootstrap';
import { isEmpty } from '../../utils/Utils';
import { Loader } from '../Layout/Loader';

const CourseDetails = ({match}) => {

    const dispatch = useDispatch();
    const {course,loading, isStudent, error} = useSelector(state => state.courseDetails);

    console.log(course)

    useEffect(() => {
        dispatch(getCourseDetails(match.params.slug))
    }, [dispatch, match.params.slug])

    return (
        <div>
            <React.Fragment>
                {course == 'undefined' || isEmpty(course) ? 
                    <Loader />
                : (
                    <React.Fragment>
                <Card className="mb-3">
                <Card.Img variant="top" src={course.image} />
                <Card.Header style={{textTransform: 'capitalize'}}>Créé par <cite title="Source Title">{course.owner.name}</cite></Card.Header>
                <Card.Body>
                <Card.Title style={{textTransform: 'capitalize'}} >{course.title}</Card.Title> 
                <Card.Text>{course.overview}</Card.Text>
                <footer className="text-right">
                {isStudent  ? (
                    <>
                    <Button variant="info" style={{float:'left'}}>continuer ce cours</Button>
                    <Button variant="danger"  >Arreter ce cours</Button>
                    </>
                ) : (
                    <Button variant="success" >Suivre ce cours</Button>
                    
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
