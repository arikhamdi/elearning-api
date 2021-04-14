import React from 'react';
import { Card } from 'react-bootstrap';
import {Link, useHistory} from 'react-router-dom';



const Course = ({course}) => {

    const history = useHistory();

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

export default Course;