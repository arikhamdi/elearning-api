import React, { useEffect, useState } from 'react';
import { Button, Card, ListGroup } from 'react-bootstrap';
import {useHistory} from 'react-router-dom';
import { enroll } from './CoursesAction';
import axios from 'axios';


const Course = ({course, page, user}) => {


    const history = useHistory();
    const [isStudent, setStudent] = useState(false);

    console.log(course)
    
    
    const loadShortDescription = () => {
        return (
            <Card onClick={() => history.push(`/course/${course.slug}`)} 
                    style={{cursor: 'pointer'}}>
            <Card.Img variant="top" src={course.image} />
            <Card.Header className="text-right" style={{textTransform: 'capitalize'}}>
                {course.subject.title}
            </Card.Header>
            <Card.Body>
            <Card.Title style={{textTransform: 'capitalize'}} >{course.title}</Card.Title>
            <Card.Text>{course.overview}</Card.Text>
            <footer className="blockquote-footer">
                <cite title="Source Title">{course.owner.name}</cite>
            </footer>
        </Card.Body>
        </Card>
        )
    }

    const loadDetailledDescription = () => {

            return (
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
                    <Button variant="info" onClick={() => history.push(`/student/${course.slug}`)} style={{float:'left'}}>continuer ce cours</Button>
                    <Button variant="danger" onClick={enroll} >Arreter ce cours</Button>
                    </>
                ) : (
                    <Button variant="success" onClick={enroll}  >Suivre ce cours</Button>
                    
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
            )
    }

    const checkIfStudent = () => {
        if (course.students.filter((student) => student.email == user.email).length > 0) {
            setStudent(true);
        }else {
            setStudent(false)
        }
    }

    useEffect(() => {
        if (page !== 'home'){
            checkIfStudent();
        }
        
    }, [course, user]);



   
    return (
     <React.Fragment>
            {(page === "home") ? loadShortDescription() : loadDetailledDescription()}   
     </React.Fragment>              
    )
}

  
export default Course;