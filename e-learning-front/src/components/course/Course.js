import { push } from 'connected-react-router';
import React from 'react';
import { Card } from 'react-bootstrap';
import {Link, useHistory} from 'react-router-dom';
import store, { history } from '../../store';



const Course = ({course}) => {


    return (
        <Card>
        <Card.Link href={`/course/${course.slug}`}  
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
                            
        </Card.Link>
        </Card>
    )
}

export default Course;