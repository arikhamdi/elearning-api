import React, { Component } from 'react';
import axios from 'axios';

import { Container } from "react-bootstrap";

import Slider from '../layout/Slider';
import SubNav from '../layout/SubNav';

import {Card} from 'react-bootstrap';

export default class Courses extends Component {

    state = {
        courses: []
    }
    
    componentDidMount = async () => {
        let url = "/";

        if (this.props.match.params.subject) {
            url = `/subject/${this.props.match.params.subject}`;
        }
        const response = await axios.get(url.toLowerCase());

        console.log(response);

        this.setState({
            courses: response.data
        });
    }

    render() {

        return (
            <Container>
                <Slider />
                <SubNav subject={this.props.match.params} />
                <div className="card-deck">
                {
                    this.state.courses.map(
                        course => (
                            <Card key={course.id} onClick={() => this.props.history.push("/course/"+ course.slug + "/")} style={{cursor: 'pointer'}}>
            
                            <Card.Img variant="top" src={course.image} />
                            <Card.Header className="text-right" style={{textTransform: 'capitalize'}}>{course.subject.title}</Card.Header>
                            <Card.Body>
                                <Card.Title style={{textTransform: 'capitalize'}} >{course.title}</Card.Title>
                                <Card.Text>{course.overview}</Card.Text>
                                <footer className="blockquote-footer">
                                    <cite title="Source Title">{course.owner.name}</cite>
                                </footer>
                            </Card.Body>
                            
                            </Card>
                        )
                    )
                }   
                </div>
            </Container>
        )
    }
}
